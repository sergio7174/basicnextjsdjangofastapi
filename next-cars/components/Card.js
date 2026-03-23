"use client"; // Required for client-side functionality in App Router
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from "next/router";
import Cookies from 'js-cookie'; //
import axios from 'axios';

const Card = ({brand, make, year, url, km, price, cm3, id}) => {

  const [userToken, setUserToken] = useState(undefined);
  const router = useRouter();


 useEffect(() => {
    // Access the cookie on the client side after the component mounts
    const jwt = Cookies.get('user_token');
    //alert("Im at add.jsx - line 14 - jwt:" + jwt);
    setUserToken(jwt);
  }, []);


  
// Function to delete the cars image
const deleteImage = async (filename) => {

  const formData = new FormData();
    formData.append("filename", filename);

  //alert("Im at cards.js - handle deleteImage - line 28 - image filename: " + filename)
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars/delete_image/`, {
      method: "POST",
      headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${userToken}`,
        },
        body: JSON.stringify({ filename: filename }),
    });

    if (response.ok) {
      //alert("Image deleted successfully");
    } else {
      //alert("Failed to delete image");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};


  // Function to handle the deletion
  const handleDelete = async (id, url) => {

    if (url) {
      //alert("Im at cards.js - handle delete - line 46 - image url: " + url)
      deleteImage(url);
     }

    //alert("Im at cards.js - handle delete - line 50 - id: " + id)
    try {
      // --- Option A: Using Server Action ---
      // const result = await deleteItem(id); 
       //alert("Im at add.jsx - line 62 - userToken:" + userToken);
       // this the way with fetch
      // --- Option B: Using API Route (uncomment if using API route above) ---
      /*const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `bearer ${userToken}`,
        },
      });*/

         const response = await axios({
              method: "DELETE",
              url: `${process.env.NEXT_PUBLIC_API_URL}/cars/${id}`,
              headers: {
                "Content-Type": "multipart/form-data",
                
                Authorization: `bearer ${userToken}`,
              },
            });

      if (!response.ok) {
        //alert('Im alt cards - handle delete - line 72 - response not ok ')
        throw new Error('Failed to delete item');
        
      }
      //const result = await response.json();
      if (response.ok) {
      //alert('Im alt cards - handle delete - line 78 - response OK ')
      router.push("/cars");
      }
      

    } catch (error) {
      console.error('Error deleting item:', error);
      // Handle errors (e.g., show an error message)
    }
  };


  return (
    <Link href={"cars/" + id}>
        <div className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform duration-200">
        <div className="w-full"><img src={`${process.env.NEXT_PUBLIC_API_URL}/`+url} alt={brand} height={300} width={600} /></div>
        <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{brand} {make}</div>
            <p className="text-orange-600 font-bold">Price: {price} EUR</p>
            <p className="text-gray-700 text-base">
            A detailed car description from the Cars FARM crew.
            </p>
        </div>
  <div className="px-6 pt-4 pb-2">
    <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">made in {year}</span>
    <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Cm3:{cm3}</span>
    <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Km:{km}</span>
    <button 
              onClick={() => handleDelete(id, url)} //
              style={{ marginLeft: '10px', color: 'red' }}
              className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              Delete Car
  </button>
  </div>

  

  
</div>
  
</Link>
  )
}

export default Card


