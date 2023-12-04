"use client";
import { useState } from "react";
import axios from "axios";

export default function SearchOrderPage() {

  const [termSearch, setTermSearch] = useState<string>("");

  const findOrder = async () => {
    const url = `http://localhost:4000/api/Orders/${termSearch}`;
    try{
      const response = await axios.get(url);
      const data = response.data;
      localStorage.setItem("OrdersBySearch", JSON.stringify(data));

      if(Array.isArray(data)){
        window.location.href = "/dashboard-admin/orders";
      }else{
        window.location.href = "/dashboard-admin/orders/pedido";
      }
    }catch(error){
      console.error(error);
    }

  };
  return (
    <>
      <div className="grid grid-cols-1 gap-0 w-screen h-screen bg-white">
        <div className="grid grid-cols-1 gap-0 search justify-self-center items-center">
          <div className="searchLabel justify-self-center items-center">
            <div className="flex items-center justify-center">
              <div className="relative">
                <input
                  id="username"
                  name="username"
                  type="text"
                  className="border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
                  value={termSearch}
                  onChange={(e) => setTermSearch(e.target.value)}
                />
                <label
                  // for="username"
                  htmlFor="username"
                  className="absolute left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-blue-700"
                >
                  Termino de busqueda
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="searcModule">
          <div className="grid grid-cols-1 gap-0 search justify-self-center items-center">
            <div className="searchButtom justify-self-center items-center">
              <button 
                className="inline-block outline-none cursor-pointer text-base leading-1 rounded-full transition-all duration-300 border border-transparent tracking-wide min-w-[160px] uppercase whitespace-normal font-bold text-center py-4 px-3 text-gray-700 shadow-inner bg-transparent h-12 hover:text-white hover:bg-gray-700"
                onClick={findOrder}  
              >
                
                Buscar Pedido
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
