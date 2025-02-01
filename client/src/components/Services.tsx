import house from "../assets/House.png";
import laptop from "../assets/Laptop.png";
import atom from "../assets/Atom.png";
import { Link } from "react-router-dom";

const serviceData = [
  {
    title: "On-Site Services",
    icon: house,
    summary: "On-Site Diagnostic and Repair in Cheshire and Neighboring Towns",
    page: "on-site",
    pricing: "$120 per hour",
    description:
      "Our on-site services are designed to make IT support convenient and stress-free. Whether you need a computer repaired, a network setup, or assistance with any tech-related issue, our team is here to help.",
  },
  {
    title: "Arrange a Pickup",
    icon: laptop,
    summary: "Arrange a Pickup for Repair in Cheshire and Neighboring Towns",
    page: "pickup",
    pricing: "$80 - $200",
    description: `We make IT support convenient and stress-free with our pickup services! We will pick up your device, repair it, and deliver it back to you.`,
  },
  {
    title: "Development",
    icon: atom,
    summary:
      "Custom Web Applications and API Integrations to Support your Home and Business.",
    page: "development",
    pricing: "Get a Quote",
    description:
      "Our development services are designed to help you get the most out of your tech. Whether you need a custom web application, an API integration, or a software solution tailored to your needs, our team is here to help.",
  },
];

export default function Services() {
  return (
    <div className="flex mb-40">
      <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-3">
        {serviceData.map((item) => (
          <Link
            to={`/form/${item.page}`}
            className={``}
            aria-current="page"
            key={item.title}
          >
            <div className="relative flex flex-col items-center justify-center w-5/6 m-auto mb-4 duration-300 shadow-xl hover:shadow-2xl h-96 hoverborder-gray-200 hover:border-2 group hover:scale-105 rounded-xl">
              <div className="flex justify-center p-4 mt-4 sm:w-full">
                <img className="h-16" src={item.icon} alt="House" />
              </div>
              <h2 className="text-2xl font-semibold text-center">
                {item.title}
              </h2>
              <div className="p-2 rounded-b-xl">
                <div className="p-2 rounded-b-xl">
                  <p className="text-sm font-semibold text-center text-sky-600 rounded-t-xl">
                    {item.summary}
                  </p>
                  <p className="p-2 text-sm text-center text-gray-500">
                    {item.description}
                  </p>
                  {/* <div className="flex justify-center w-full p-4 mt-6">
                    <div className="text-lg font-semibold text-yellow-500">
                      {item.pricing}
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
