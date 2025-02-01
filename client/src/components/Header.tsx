import logo from "../assets/logo.png";
import TopNav from "./TopNav";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className='flex items-end justify-start w-full h-24 p-4 bg-black'>
      <Link to='/'>
        <img src={logo} alt='Logo' className='h-16' />
      </Link>

      <TopNav />
    </header>
  );
}
