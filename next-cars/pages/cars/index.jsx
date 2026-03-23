import Card from "../../components/Card";
import { useState, useEffect } from "react";

const Cars = () => {
 
 
 const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch("http://localhost:8000/cars/carlist");
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        setCars(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);



  return (
    <div className="flex flex-col justify-center items-center w-full">
      <h1 className=" text-orange-600 font-bold text-3xl my-5">Available Cars</h1>

      <div className="grid lg:grid-cols-4 grid-cols-3 gap-3">
        {cars.map((car) => {
         const {_id, brand, make, picture, year, km, cm3, price} = car
          return (
            
              <Card
                key={_id}
                brand={brand}
                id={_id}
                make={make}
                url={picture}
                year={year} 
                km={km}
                cm3={cm3}
                price={price}
                />
            
          );
        })}
      </div>
    </div>
  );
};

export default Cars;