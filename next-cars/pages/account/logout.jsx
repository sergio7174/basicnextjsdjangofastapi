"use client";
import { useRouter } from "next/router";
import useAuth from "../../hooks/useAuth";
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'; //

const Logout = () => {
  
  //const { user, setUser } = useAuth();
    const [ user, setUser ] = useState('null');
    const [ username, setUserName ] = useState();
    const [ userrole, setUserRole ] = useState();
  

  /*const removeCookie = async () => {
    const res = await fetch("/api/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  };*/
  const router = useRouter();

  useEffect(() => {
   
    // Remove the cookie named 'userToken', and the other Data
    Cookies.remove('user');
    Cookies.remove('user_token');
    Cookies.remove('username');
    Cookies.remove('userrole');
    setUser(null);
    setUserName(null);
    setUserRole(null)

    // This re-triggers data fetching for the current path
      router.push("/");
  }, []);

    // This re-triggers data fetching for the current path
      router.push("/");

  return <></>;
};

export default Logout;
