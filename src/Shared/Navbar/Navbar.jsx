import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import useUserData from "../../Hooks/useUserData";

const Navbar = () => {
  const { user, googleSignIn, logout } = useContext(AuthContext);
  const [userdetails] = useUserData()

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout().then = (() => {}).catch((error) => console.log(error));
  };

  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignUp = () => {
    googleSignIn().then((result) => {
      const loggedInUser = result.user;
      //   console.log(loggedInUser);
      const userdata = {
        displayName: loggedInUser.displayName,
        email: loggedInUser.email,
        photourl: loggedInUser.photoURL,
        coin: 50,
      };
      //   console.log(userdata);
      fetch("http://localhost:5000/user", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userdata),
      })
        .then((res) => res.json())
        .then(() => {
          navigate(from, { replace: true });
        });
    });
  };
  return (
    <div>
      <div className="navbar bg-yellow-600 font-bold">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl font-bold uppercase">Babette</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1  space-x-4">
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/allrecipes">All Recipe</Link>
            </li>

            {user?.email ? (
              <>
                
                <li>
                  <Link to="/addrecipe"> Add Recipe</Link>
                </li>

                <li>
                  <Link onClick={handleLogout}>Logout</Link>
                </li>

              </>
            ) : (
              <li>
                <Link onClick={handleGoogleSignUp}> Sign In</Link>
              </li>
            )}
          </ul>
        </div>
        <div className="navbar-end">
        {userdetails[0]?.coin?<p className="mr-4 text-lg">${userdetails[0]?.coin}</p>:''}
          
          {userdetails[0]?.photourl?
            <img src={userdetails[0]?.photourl} alt="user image" className="w-[40px] h-[40px] object-cover rounded-full" /> : <img src="https://i.ibb.co/fdhKfkS/images-removebg-preview.png" alt="" className="w-[40px] h-[40px] object-cover rounded-full"/> 
        }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
