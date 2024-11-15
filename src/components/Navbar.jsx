import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopProvider";


const Navbar = () => {
   const {cartQuantity}= useContext(ShopContext);
  const navigate= useNavigate();
//  console.log(shopinfo);
  const navbarmenu=<>
     <ul className="flex flex-row">
    <li><NavLink  to="/">Home</NavLink></li>
    <li><NavLink  to="/collection">COLLECTION</NavLink></li>
    <li><NavLink  to="/about">ABOUT</NavLink></li>
    <li><NavLink  to="/contact">CONTACT US</NavLink></li>
   </ul>
  
  </>
  return (
    
    <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          {navbarmenu}
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {navbarmenu}
    </ul>
  </div>
  <div className=" border m-5">
   <button onClick={()=>navigate("/cart")}> Cart: {cartQuantity} </button>
  </div>
  <div className="navbar-end">
    <a className="btn">Button</a>
  </div>

 
</div>


    
  );
};

export default Navbar;