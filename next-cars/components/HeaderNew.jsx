"use client"; // Required for client-side functionality in App Router
import { useState, useEffect } from 'react';
import axios from "axios";
import Cookies from 'js-cookie'; //
import Link from "next/link";
import useAuth from "../hooks/useAuth";


const Header = () => {
  
  const { loading } = useAuth;
  const [ user, setUser ] = useState({});
  const [ userRole, setUserRole ] = useState({});
  const [userToken, setUserToken] = useState(undefined);
  
  useEffect(() => {
      // Access the cookie on the client side after the component mounts
      const jwt = Cookies.get('user_token');
      const Inuser = Cookies.get('user');
      
      if(jwt){alert("Im at add.jsx - line 20 - jwt:" + jwt)
              setUserToken(jwt);

      }
      if(Inuser){alert("Im at add.jsx - line 21 -  user:" + Inuser);
      setUser(Inuser);
      
      setUserRole(Inuser.role);
      alert("Im at add.jsx - line 29 - userRole:" + userRole);
       
      }
      
      

    }, []);
  
  
    return (
    <div className=" text-orange-600 py-2 font-bold flex flex-row justify-between items-center">
      <div>
        {loading ? <span>Loading...</span> : ""}
        <Link href="/">
          <a>
            FARM Cars
            {user ? (
              <span className="mx-2 text-gray-500">
                {user.username} ({user.role})
              </span>
            ) : (
              ""
            )}
          </a>
        </Link>
      </div>
      <ul className="flex flex-row space-x-4 ">
        <li>
          <Link href="/cars">
            <a>Cars</a>
          </Link>
        </li>
        
        
        {user && user.role === "ADMIN" ? (
          <li>
            <Link href="/cars/add">
              <a>Add Car</a>
            </Link>
          </li>
        ) : (
          ""
        )}

        {!user ? (
          <>
            <li>
              <Link href="/account/register">
                <a>Register</a>
              </Link>
            </li>
            <li>
              <Link href="/account/login">
                <a>Login</a>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/account/logout">
                <a>Log out {user.username}</a>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};
export default Header;
