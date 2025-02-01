export default function About() {
  return (
    <div className="flex justify-center h-1/6">
      <div className="p-4 m-8 font-serif text-center text-sky-800 sm:w-2/3 sm:leading-loose sm:text-xl">
        <p className="text-xl sm:text-3xl">
          {" "}
          Welcome to{" "}
          <span className="font-semibold">Barnett Technologies.</span>
        </p>
        <p className="mt-3 text-xs text-gray-600 sm:text-base">
          We provide IT and Development Solutions for your Home and Business.
        </p>
        <p className="mt-2 text-sm text-gray-600 sm:text-lg">
          Choose a service below to get started!
        </p>
      </div>
    </div>
  );
}
