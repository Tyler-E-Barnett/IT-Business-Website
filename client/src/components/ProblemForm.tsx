import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";

const ProblemForm = () => {
  const navigate = useNavigate();
  const { type } = useParams(); // "development", "business", or "pickup/on-site"

  const initialValues = {
    companyName: "",
    firstName: "",
    lastName: "",
    issue: "",
    phoneNumber: "",
    email: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
    },
  };

  const schemaType = (type: string) => {
    if (type === "development") {
      return yup.object({
        firstName: yup.string().required("Required"),
        lastName: yup.string().required("Required"),
        issue: yup.string().required("Required"),
        phoneNumber: yup.string().required("Required"),
        email: yup.string().email("Invalid email").required("Required"),
      });
    } else if (type === "business") {
      return yup.object({
        companyName: yup.string().required("Required"),
        firstName: yup.string().required("Required"),
        lastName: yup.string().required("Required"),
        issue: yup.string().required("Required"),
        phoneNumber: yup.string().required("Required"),
        email: yup.string().email("Invalid email").required("Required"),
        address: yup.object().shape({
          street: yup.string().required("Required"),
          city: yup.string().required("Required"),
          state: yup.string().required("Required"),
          zip: yup.string().required("Required").length(5),
        }),
      });
    } else {
      return yup.object({
        firstName: yup.string().required("Required"),
        lastName: yup.string().required("Required"),
        issue: yup.string().required("Required"),
        phoneNumber: yup.string().required("Required"),
        email: yup.string().email("Invalid email").required("Required"),
        address: yup.object().shape({
          street: yup.string().required("Required"),
          city: yup.string().required("Required"),
          state: yup.string().required("Required"),
          zip: yup.string().required("Required").length(5),
        }),
      });
    }
  };

  const validationSchema = schemaType(type || "");

  const onSubmit = async (values: any, { setSubmitting }: any) => {
    const key = "HOrDSminglINtIONAlMANTEreStERONyVeLEClINENDOWEAmBi";

    try {
      await axios.post(`/api/form/${type}/${key}`, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      navigate("/thankyou");
    } catch (error) {
      alert("Error Submitting");
    }
    setSubmitting(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="mt-8 text-4xl font-bold text-center capitalize">
        {type} Form
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="mt-10 space-y-6">
          {/* Business-specific company name field */}
          {type === "business" && (
            <div>
              <label
                htmlFor="companyName"
                className="block mb-2 text-sm font-bold text-gray-700"
              >
                Company Name
              </label>
              <Field
                type="text"
                id="companyName"
                name="companyName"
                placeholder="Barnett Technologies"
                className="w-full px-4 py-2 bg-gray-200 border rounded focus:bg-white focus:outline-none"
              />
              <ErrorMessage
                name="companyName"
                component="div"
                className="text-xs text-red-500"
              />
            </div>
          )}

          {/* Common Fields */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="firstName"
                className="block mb-2 text-sm font-bold text-gray-700"
              >
                First Name
              </label>
              <Field
                type="text"
                id="firstName"
                name="firstName"
                placeholder="John"
                className="w-full px-4 py-2 bg-gray-200 border rounded focus:bg-white focus:outline-none"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-xs text-red-500"
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block mb-2 text-sm font-bold text-gray-700"
              >
                Last Name
              </label>
              <Field
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Smith"
                className="w-full px-4 py-2 bg-gray-200 border rounded focus:bg-white focus:outline-none"
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-xs text-red-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="issue"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              {type === "development"
                ? "Describe your idea/needs"
                : "Describe the issue"}
            </label>
            <Field
              as="textarea"
              id="issue"
              name="issue"
              rows={4}
              placeholder={
                type === "development"
                  ? "I need a custom API built!"
                  : "My laptop won't boot."
              }
              className="w-full px-4 py-2 bg-gray-200 border rounded focus:bg-white focus:outline-none"
            />
            <ErrorMessage
              name="issue"
              component="div"
              className="text-xs text-red-500"
            />
          </div>

          <div>
            <label
              htmlFor="phoneNumber"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Phone Number
            </label>
            <Field
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="(123) 456-7890"
              className="w-full px-4 py-2 bg-gray-200 border rounded focus:bg-white focus:outline-none"
            />
            <ErrorMessage
              name="phoneNumber"
              component="div"
              className="text-xs text-red-500"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Email
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              placeholder="john.smith@example.com"
              className="w-full px-4 py-2 bg-gray-200 border rounded focus:bg-white focus:outline-none"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-xs text-red-500"
            />
          </div>

          {(type === "business" || type === "pickup" || type === "on-site") && (
            <>
              <div>
                <label
                  htmlFor="address.street"
                  className="block mb-2 text-sm font-bold text-gray-700"
                >
                  Street Address
                </label>
                <Field
                  type="text"
                  id="address.street"
                  name="address.street"
                  placeholder="123 Main St"
                  className="w-full px-4 py-2 bg-gray-200 border rounded focus:bg-white focus:outline-none"
                />
                <ErrorMessage
                  name="address.street"
                  component="div"
                  className="text-xs text-red-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="address.city"
                    className="block mb-2 text-sm font-bold text-gray-700"
                  >
                    City
                  </label>
                  <Field
                    type="text"
                    id="address.city"
                    name="address.city"
                    placeholder="Cheshire"
                    className="w-full px-4 py-2 bg-gray-200 border rounded focus:bg-white focus:outline-none"
                  />
                  <ErrorMessage
                    name="address.city"
                    component="div"
                    className="text-xs text-red-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="address.state"
                    className="block mb-2 text-sm font-bold text-gray-700"
                  >
                    State
                  </label>
                  <Field
                    type="text"
                    id="address.state"
                    name="address.state"
                    placeholder="CT"
                    className="w-full px-4 py-2 bg-gray-200 border rounded focus:bg-white focus:outline-none"
                  />
                  <ErrorMessage
                    name="address.state"
                    component="div"
                    className="text-xs text-red-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="address.zip"
                    className="block mb-2 text-sm font-bold text-gray-700"
                  >
                    Zip Code
                  </label>
                  <Field
                    type="text"
                    id="address.zip"
                    name="address.zip"
                    placeholder="06410"
                    className="w-full px-4 py-2 bg-gray-200 border rounded focus:bg-white focus:outline-none"
                  />
                  <ErrorMessage
                    name="address.zip"
                    component="div"
                    className="text-xs text-red-500"
                  />
                </div>
              </div>
            </>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default ProblemForm;
