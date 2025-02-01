export default function About() {
  return (
    <div className="flex items-center justify-center ">
      <div className="p-8 m-4 text-center bg-white sm:leading-loose sm:text-xl">
        <p className="text-2xl font-bold text-sky-800 sm:text-4xl">
          Welcome to{" "}
          <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-sky-500">
            Barnett Technologies
          </span>
        </p>
        <p className="mt-4 text-base text-gray-700 sm:text-lg">
          We provide cutting-edge IT and Development Solutions for your Home and
          Business.
        </p>
        <p className="mt-3 text-sm text-gray-600 sm:text-base">
          Choose a service below to get started!
        </p>
      </div>
    </div>
  );
}
