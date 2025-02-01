import contact from "../assets/contact.png";

export default function Contact() {
  return (
    <div className="flex items-center justify-center h-full p-4 mt-auto text-left align-middle">
      <div className="m-auto">
        <img className="h-48 m-auto mt-4 mb-12" src={contact} alt="contact" />
        <div className="">
          <span className="font-semibold">Phone: </span>{" "}
          <a className="text-blue-500" href="tel:203-824-4320">
            (203) 824-4320
          </a>
        </div>
        <div className="">
          <span className="font-semibold">Email: </span>
          <a
            className="text-blue-500"
            href="mailto:barnetttechnologies@gmail.com"
          >
            barnetttechnologies@gmail.com
          </a>
        </div>
      </div>

      {/* <ProblemForm /> */}
    </div>
  );
}
