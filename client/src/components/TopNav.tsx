import { Link, useLocation } from "react-router-dom";

export default function TopNav() {
  const currentPath = useLocation();
  const pathname = currentPath.pathname;
  const pages = [
    { path: "/", name: "Home" },
    { path: "/contact", name: "Contact" },
    { path: "/pricing", name: "Pricing" },
  ];

  function mapPages() {
    return pages.map((page) => (
      <li key={page.name}>
        <Link
          to={page.path}
          className={`block py-2 pl-3 pr-4 rounded hover:text-sky-400${
            pathname === page.path
              ? "  text-sky-600 font-bold"
              : " text-gray-500"
          }`}
          aria-current="page"
        >
          {page.name}
        </Link>
      </li>
    ));
  }

  return (
    <nav className="h-12 bg-black border-gray-200">
      <div className="p-2 ml-4">
        <div className="text-white sm:hidden dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-black rounded-box w-52"
          >
            {mapPages()}
          </ul>
        </div>
        <div className="hidden w-full sm:block sm:w-auto" id="navbar-default">
          <ul className="flex flex-col p-3 border rounded-lg sm:p-0 sm:flex-row sm:space-x-8 sm:mt-0 sm:border-0 dark:border-gray-700">
            {mapPages()}
          </ul>
        </div>
      </div>
    </nav>
  );
}
