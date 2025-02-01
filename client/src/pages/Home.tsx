import Services from "../components/Services";
import About from "../components/About";

export default function Home() {
  return (
    <div className="flex flex-col gap-2">
      <About />
      <Services />
    </div>
  );
}
