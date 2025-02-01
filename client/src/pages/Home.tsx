import Services from "../components/Services";
import About from "../components/About";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 ">
      <About />
      <Services />
    </div>
  );
}
