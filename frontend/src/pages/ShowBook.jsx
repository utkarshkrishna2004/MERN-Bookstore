import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowBook = () => {
   const [book, setBook] = useState({});
   const [loading, setLoading] = useState(false);
   const { id } = useParams();

   useEffect(() => {
      setLoading(true);
      axios
         .get(`http://localhost:5555/books/${id}`)
         .then((response) => {
            setBook(response.data);
            setLoading(false);
         })
         .catch((error) => {
            console.error("Error fetching data:", error);
            setLoading(false);
         });
   }, [id]);

   return (
      <div className="p-4 ">
         <BackButton />
         <h1 className="text-3xl my-4">Show Book</h1>
         {loading ? (
            <Spinner />
         ) : (
            <div className="flex flex-col bottom-2 border-sky-400 rounded-xl w-fit p-4">
               {Object.entries(book).map(([key, value]) => (
                  <div key={key} className="my-4">
                     <span className="text-lg font-bold text-gray-800">
                        {key}:
                     </span>
                     <span className="ml-2">
                        {typeof value === "object"
                           ? JSON.stringify(value)
                           : value}
                     </span>
                  </div>
               ))}
            </div>
         )}
      </div>
   );
};

export default ShowBook;
