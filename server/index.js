require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const { Form, Customers } = require("./schemas.js");
const bodyParser = require("body-parser");
const path = require("path");

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

// Create a route for sending emails
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
//   try {
//     const newEntry = Form({
//       status: "pending",
//       type,
//       firstName,
//       lastName,
//       issue,
//       phoneNumber,
//       email,
//       address: {
//         street: address.street,
//         city: address.city,
//         state: address.state,
//         zip: address.zip,
//       },
//     });
//     const result = await newEntry.save();
//     res.status(200).send(result);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT} ...`));
