import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const {currentUser}= useSelector(state=>state.user)
  const [searchTerm, setSearchTerm]= useState('')
  const navigate= useNavigate()
  // console.log(currentUser.avatar)
  const handleSubmit= e=>{
    e.preventDefault()
    const urlParams= new URLSearchParams(window.location.search)
    urlParams.set('searchTerm', searchTerm)
    const searchQuery= urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }
  useEffect(()=>{
    const urlParams= new URLSearchParams(location.search)
    const searchTermFromUrl= urlParams.get('searchTerm')
    // console.log(searchTermFromUrl)
    if(searchTermFromUrl){
      return setSearchTerm(searchTermFromUrl)
    }
  },[location.search])
  return (
    <header className="bg-slate-200 shadow-md " >
      <div className="flex flex-wrap justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Satya</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form onSubmit={handleSubmit} className="max-sm:order-3 max-sm:mt-3 max-sm:w-full border bg-slate-100 p-1 sm:p-2 rounded-lg flex justify-between items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={e=>setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </form>
        <ul className="flex gap-4 font-semibold text-slate-700">
          <NavLink to="/" className="hover:underline hover:underline-offset-4">Home</NavLink>
          <NavLink to={"/about"} className="hover:underline hover:underline-offset-4 ">About</NavLink>
        {
          currentUser?
          <Link to={"/profile"}>
            <img className="rounded-full h-7 w-7 object-cover" src={currentUser?.avatar} alt="profile" />
          </Link>

          :
          <NavLink to={"/sign-in"} className="hover:underline hover:underline-offset-4 ">Sign in</NavLink>
        }
        </ul>
      </div>
    </header>
  );
};

export default Header;
