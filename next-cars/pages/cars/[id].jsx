import Image from "next/image";
import Card from "../../components/Card";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from 'next/link'

/*export const getStaticPaths = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars`);
  const cars = await res.json();

  const paths = cars.map((car) => ({
    params: { id: car._id },
  }));

  return { paths, fallback: "blocking" };
};*/

/*export const getStaticProps = async ({ params: { id } }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars/${id}`);
  const car = await res.json();

  return {
    props: { car },
    revalidate: 10,
  };
};*/



const CarById = () => {

  const router = useRouter() 
  const { id } = router.query 
  const [car, setCar] = useState(null) 
  const [loading, setLoading] = useState(true) 
  const [error, setError] = useState(null)

useEffect(() => { if (!id) return

}, [id])

useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch(`http://localhost:8000/cars/${id}`);
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setCar(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

if (loading) return <div className="text-center mt-10">Loading...</div> 
if (error) return <div className="text-center mt-10 text-red-500">Error: {error}
</div> 
if (!car) return <div className="text-center mt-10">No car found</div>

  return (
    <div className="flex flex-col justify-center items-center min-h-full">
      <h1 className="text-xl font-bold text-gray-700">
        {car.brand} - {car.make}
      </h1>
      <div className=" bg-white p-5 shadow-md rounded-lg">
        <img src={`${process.env.NEXT_PUBLIC_API_URL}/`+car.picture} width={700} height={400} />
      </div>
      <div className=" text-gray-500 m-5">{`This fine car was manufactured in ${car.year}, it made just ${car.km} km and it sports a ${car.cm3} cm3 engine.`}</div>

      <div className="text-gray-500 font-bold">Price: {car.price} eur</div>
     
    </div>
    
  );
};

export default CarById;