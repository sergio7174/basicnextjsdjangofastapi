"use client"; // Required for client-side functionality in App Router
import { useState, useEffect } from 'react';
import Link from "next/link";
import useAuth from "../hooks/useAuth";
import Cookies from 'js-cookie'; //

const Header = () => {

    
    const { loading, setLoading } = useAuth();
    const [ username, setUserName ] = useState();
    const [ userrole, setUserRole ] = useState();
    
    

  useEffect(() => {
    (async () => {
      //const userData = await fetch("/api/user");
      try {
        //const user = await userData.json();
        const username = Cookies.get('username');
        const userrole = Cookies.get('userrole');
        
        setUserName(username);
        setUserRole(userrole);
     
        //alert('Im at header component - useeffect - line 28 - user: ' + username)
        //alert('Im at header component - useeffect - line 29 - user.role: ' + userrole)
        
        
      } catch (error) {
        // if error: set user to null, destroy the cookie
        //setUser(null);
      }
    })();
  }, []);
  return (
    <div className=" text-orange-600 py-2 font-bold flex flex-row justify-between items-center">
      <div>
        {loading ? <span>Loading...</span> : ""}
        {/*<h6>user: {user.role}</h6>*/}
        <Link href="/">
          <a>
            FARM Cars

            {username ? (
              <span className="mx-2 text-gray-500">
                {username} ({userrole})
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
        {username && userrole === "ADMIN" ? (
          <li>
            <Link href="/add">
              <a>Add Car</a>
            </Link>
          </li>
        ) : (
          ""
        )}

        {!username ? (
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
                <a>Log out {username}</a>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};
export default Header;