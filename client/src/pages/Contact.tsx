import contact from "../assets/contact.png";

export default function Contact() {
  const phone = import.meta.env.VITE_CONTACT_PHONE;
  const email = import.meta.env.VITE_CONTACT_EMAIL;

  return (
    <div className="flex items-center justify-center h-full p-4 mt-auto text-left align-middle">
      <div className="m-auto">
        <img className="h-48 m-auto mt-4 mb-12" src={contact} alt="contact" />
        <div>
          <span className="font-semibold">Phone: </span>
          <a className="text-blue-500" href={`tel:${phone}`}>
            {phone}
          </a>
        </div>
        <div>
          <span className="font-semibold">Email: </span>
          <a className="text-blue-500" href={`mailto:${email}`}>
            {email}
          </a>
        </div>
      </div>
    </div>
  );
}
