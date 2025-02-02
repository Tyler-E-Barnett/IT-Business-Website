require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const { Form, Customers } = require("./schemas.js");
const bodyParser = require("body-parser");
const path = require("path");
// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: process.env.SMTP_PORT || 587,
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// const transporter = nodemailer.createTransport({
//   service: "gmail", // You can use "outlook", "yahoo", or custom SMTP as needed
//   auth: {
//     user: process.env.EMAIL_USER, // Your email address (e.g., Gmail)
//     pass: process.env.EMAIL_PASS, // App password (if using Gmail)
//   },
// });

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());

const _dirname = path.dirname("");
const buildPath = path.join(_dirname, "../client/dist/");

app.use(express.static(buildPath));

const mongoURI = process.env.VITE_MONGO_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to DB");
});

mongoose.connection.on("error", (error) =>
  console.error("MongoDB Connection Error:", error)
);

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../client/dist/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(`${err} and ${__dirname}`);
      }
    }
  );
});

app.post("/api/form/:type/:apiKey", async (req, res) => {
  console.log("submitted form", req.body);
  const key = req.params["apiKey"];

  if (key !== process.env.API_KEY) {
    res.status(401).send("Unauthorized");
    return;
  }

  const type = req.params["type"];
  const { firstName, lastName, issue, phoneNumber, email, address } = req.body;

  try {
    // Check if the customer exists using email or phone number
    let customer = await Customers.findOne({
      $or: [{ email }, { phoneNumber }],
    });

    if (!customer) {
      // Create a new customer if not found
      customer = new Customers({
        firstName,
        lastName,
        email,
        phoneNumber,
        tickets: [], // Initialize tickets array
      });
      await customer.save();
    } else {
      // Optionally update customer details if they exist
      customer.firstName = firstName;
      customer.lastName = lastName;
      customer.phoneNumber = phoneNumber;
      await customer.save();
    }

    // Create a new ticket associated with the customer
    const newTicket = new Form({
      status: "pending",
      type,
      firstName,
      lastName,
      issue,
      phoneNumber,
      email,
      address: {
        street: address.street,
        city: address.city,
        state: address.state,
        zip: address.zip,
      },
    });
    const result = await newTicket.save();
    console.log("New ticket created:", result);

    // Add the ticket to the customer's tickets array
    await Customers.findByIdAndUpdate(
      customer._id,
      { $push: { tickets: newTicket._id } }, // Push the new ticket ID into the array
      { new: true }
    );

    // Send email notification and handle errors
    // try {
    //   await transporter.sendMail({
    //     from: `"Barnett Technologies Alerts" <${process.env.EMAIL_USER}>`,
    //     to: "barnetttechnologies@gmail.com", // Your email address where you want the alert
    //     subject: `New Ticket Created: ${result.type}`,
    //     html: `
    //     <h2>New Ticket Submitted</h2>
    //     <p><strong>Customer:</strong> ${firstName} ${lastName}</p>
    //     <p><strong>Issue:</strong> ${issue}</p>
    //     <p><strong>Phone Number:</strong> ${phoneNumber}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Address:</strong> ${address.street}, ${address.city}, ${address.state} ${address.zip}</p>
    //   `,
    //   });
    //   console.log("Email sent successfully");
    // } catch (emailError) {
    //   console.error("Error sending email:", emailError);
    // }

    // Corrected response format
    res.status(201).json({
      message: "Ticket created and added to customer",
      ticket: result,
    });
  } catch (error) {
    console.error("Error creating ticket or updating customer:", error);
    res.status(500).json({ error: "Error creating ticket" });
  }
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT} ...`));
