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
      "Custom Web Applications and API Integrations to Support your Business.",
    page: "development",
    pricing: "Get a Quote",
    description:
      "Whether you need a custom web application, an API integration, or a software solution tailored to your needs, our team is here to help.",
  },
];

export default function Services() {
  return (
    <div className="flex mb-20">
      <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-3 sm:grid-cols-2">
        {serviceData.map((item) => (
          <Link
            to={`/form/${item.page}`}
            className="group"
            aria-current="page"
            key={item.title}
          >
            <div className="relative flex flex-col items-center justify-start w-5/6 m-auto duration-300 bg-white shadow-xl hover:shadow-2xl hover:scale-105 h-96 rounded-xl">
              {/* Icon Section */}
              <div className="flex justify-center w-full p-4 mt-6 sm:mt-8">
                <img className="h-16" src={item.icon} alt={item.title} />
              </div>

              {/* Title */}
              <h2 className="text-2xl font-semibold text-center">
                {item.title}
              </h2>

              {/* Content Section */}
              <div className="flex flex-col items-center justify-between p-4 mt-4 text-center">
                <p className="text-sm font-semibold text-sky-600">
                  {item.summary}
                </p>
                <p className="mt-2 text-xs text-gray-500">{item.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
