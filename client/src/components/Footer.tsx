import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <div className="w-full mt-auto">
      <footer className="p-10 mb-auto bg-gray-300 rounded footer footer-center text-base-content">
        <nav className="grid grid-flow-col gap-4">
          <Link to={"/"}>Home</Link>
          <Link to={"/contact"}>Contact</Link>
          <Link to={"/pricing"}>Pricing</Link>
        </nav>
        <aside>
          <p>
            Copyright © 2023 - All right reserved by Barnett Technologies LLC
          </p>
        </aside>
      </footer>
    </div>
  );
}
