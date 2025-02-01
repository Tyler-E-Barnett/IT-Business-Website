import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";

const ProblemForm = () => {
  const navigate = useNavigate();
  const { type } = useParams();

  // const server = "https://barnett-server-0ed9053145e3.herokuapp.com";
  // const server = "/server";

  const initialValues = {
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

  const validationSchema =
    type !== "development"
      ? yup.object({
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
        })
      : yup.object({
          firstName: yup.string().required("Required"),
          lastName: yup.string().required("Required"),
          issue: yup.string().required("Required"),
          phoneNumber: yup.string().required("Required"),
          email: yup.string().email("Invalid email").required("Required"),
        });

  const onSubmit = async (values: any, { setSubmitting }: any) => {
    const key = "HOrDSminglINtIONAlMANTEreStERONyVeLEClINENDOWEAmBi";

    try {
      const config = {
        method: "post",
        url: `/api/form/${type}/${key}`,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        data: values,
      };
      await axios(config);
      // go to thank you page.
      navigate("/thankyou");
    } catch (error) {
      alert("Error Submitting");
    }

    setSubmitting(false);
  };

  return (
    <div className="">
      <h1 className="mt-8 text-4xl font-bold text-center">{type}</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="w-full max-w-lg p-5 m-auto mt-10">
          <div className="flex flex-wrap mb-6 -mx-3">
            <div className="w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                htmlFor="grid-first-name"
              >
                First Name
              </label>
              <Field
                type="text"
                id="grid-first-name"
                name="firstName"
                placeholder="John"
                className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border rounded appearance-none focus:outline-none focus:bg-white"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-xs italic text-red-500"
              />
            </div>
            <div className="w-1/2 px-3">
              <label
                className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                htmlFor="grid-last-name"
              >
                Last Name
              </label>
              <Field
                type="text"
                id="grid-last-name"
                name="lastName"
                placeholder="Smith"
                className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white"
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-xs italic text-red-500"
              />
            </div>
          </div>
          <div className="flex flex-wrap mb-6 -mx-3">
            <div className="w-full px-3">
              <label
                className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                htmlFor="grid-issue"
              >
                {type === "development"
                  ? "Give a description of your idea/needs"
                  : "Describe your issue."}
              </label>
              <Field
                as="textarea"
                id="grid-issue"
                name="issue"
                placeholder={
                  type === "development"
                    ? "I need a REST API!"
                    : "My computer keeps crashing!"
                }
                className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white"
                rows={5}
                maxLength={500}
              />
              <ErrorMessage
                name="issue"
                component="div"
                className="text-xs italic text-red-500"
              />
            </div>
          </div>
          <div className="flex flex-wrap mb-6 -mx-3">
            <div className="w-full px-3">
              <label
                className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                htmlFor="grid-phoneNumber"
              >
                Phone Number
              </label>
              <Field
                type="text"
                id="grid-phoneNumber"
                name="phoneNumber"
                placeholder="(123) 456-7890"
                className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white"
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="text-xs italic text-red-500"
              />
            </div>
          </div>
          <div className="flex flex-wrap mb-6 -mx-3">
            <div className="w-full px-3">
              <label
                className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                htmlFor="grid-email"
              >
                Email
              </label>
              <Field
                type="email"
                id="grid-email"
                placeholder="John.Smith@gmail.com"
                name="email"
                className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-xs italic text-red-500"
              />
            </div>
          </div>
          {type !== "development" && (
            <div className="">
              <div className="flex flex-wrap mb-6 -mx-3">
                <div className="w-full px-3">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    htmlFor="grid-address-street"
                  >
                    Address
                  </label>
                  <Field
                    type="text"
                    id="grid-address-street"
                    name="address.street"
                    placeholder="123 Main St"
                    className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white"
                  />
                  <ErrorMessage
                    name="address.street"
                    component="div"
                    className="text-xs italic text-red-500"
                  />
                </div>
              </div>
              <div className="flex flex-wrap mb-6 -mx-3">
                <div className="w-1/3 px-3 ">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    htmlFor="grid-address-city"
                  >
                    City
                  </label>
                  <Field
                    type="text"
                    id="grid-address-city"
                    name="address.city"
                    placeholder="Cheshire"
                    className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white"
                  />
                  <ErrorMessage
                    name="address.city"
                    component="div"
                    className="text-xs italic text-red-500"
                  />
                </div>
                <div className="w-1/3 px-3 ">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    htmlFor="grid-address-state"
                  >
                    State
                  </label>
                  <Field
                    type="text"
                    id="grid-address-state"
                    name="address.state"
                    placeholder="CT"
                    className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white"
                  />
                  <ErrorMessage
                    name="address.state"
                    component="div"
                    className="text-xs italic text-red-500"
                  />
                </div>
                <div className="w-1/3 px-3 ">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    htmlFor="grid-address-zip"
                  >
                    Zip
                  </label>
                  <Field
                    type="text"
                    id="grid-address-zip"
                    name="address.zip"
                    placeholder="06410"
                    className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white"
                  />
                  <ErrorMessage
                    name="address.zip"
                    component="div"
                    className="text-xs italic text-red-500"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <div className="p-3 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
              <button type="submit">Submit</button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default ProblemForm;
