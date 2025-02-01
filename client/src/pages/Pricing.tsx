const servicesData = [
  {
    title: "Diagnostic",
    description: "We will diagnose your IT issues.",
    price: "$40",
  },
  {
    title: "Consulting",
    description: "Expert advice and solutions for your IT challenges.",
    price: "$100 per hour",
  },
  {
    title: "On-Site Services",
    description:
      "We will come to your Home or Business provide IT Services. $100 an hour after the first hour",
    price: "$150 per visit",
  },
  {
    title: "Development",
    description: "We can build websites, web apps, APIs etc...",
    price: "Varies with project",
  },
];

function Pricing() {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-4 p-2 m-auto mb-6">
      <h1 className="my-3 text-3xl font-semibold text-center">Pricing</h1>
      <ul className="w-full">
        {servicesData.map((item, index) => (
          <li
            key={index}
            className="flex flex-col justify-center p-4 m-auto mb-3 sm:w-1/3 sm:p-0"
          >
            <div>
              <div className="flex justify-between ">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="font-medium">{item.price}</p>
              </div>

              <p className="text-gray-500">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pricing;
