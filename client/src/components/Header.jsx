import { FaSearch } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Satya</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form className="bg-slate-100 p-2 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-600" />
        </form>
        <ul className="hidden sm:flex gap-4 font-semibold">
          <NavLink to="/" className="hover:underline hover:underline-offset-4">Home</NavLink>
          <NavLink to={"/about"} className="hover:underline hover:underline-offset-4 ">About</NavLink>
          <NavLink to={"/sign-in"} className="hover:underline hover:underline-offset-4 ">Sign in</NavLink>
        </ul>
      </div>
    </header>
  );
};

export default Header;
