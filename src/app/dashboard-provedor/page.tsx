"use client";

import { use, useEffect, useState } from "react";

export default function DashboardProvedor() {
    const [name, setName] = useState("name");
    useEffect(() => {
        getUSer();

    
    }, []);

    const getUSer = () => {
        const userName = localStorage.getItem("userName");
        if (userName) {
            setName(userName);
            console.log(userName);
        }else{
            console.log("no hay usuario");
        }
        return userName;
    };

    const getAllOrders = () => {
        localStorage.setItem("OrdersByClient", name);
        localStorage.setItem("searchByClient", "true");
        window.location.href = "/dashboard-admin/orders";
    };
    
    return (
        <>
      {/* <div className="flex items-center justify-center w-screen h-screen"> */}
      <div className = {`min-h-screen bg-white sm:py-12 w-full md:w-auto h-full text-black border-4 flex items-center justify-center ` }>
        <div className="grid gap-12 grid-cols-1 grid-rows-5">
          <div className= {`flex justify-center w-full md:w-auto x`}>
            {/* <h1 className="text-base">Consultar pedidos</h1> */}
            <button
              type="button"
              className="text-Crear Pedido text-first hover:text-white border border-first hover:bg-first focus:ring-4 focus:outline-none focus:ring-first font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2  "
            >
              <a href="/dashboard-provedor/create-order">Crear Pedido</a>
              {/* Consultar pedidos */}
            </button>
          </div>

          <div className=" flex justify-center w-full md:w-auto">
            {/* <h1 className="text-base">Buscar Pedido</h1> */}
            <button
              type="button"
              className="text-Consultar Pedidos text-first hover:text-white border border-first hover:bg-first focus:ring-4 focus:outline-none focus:ring-first font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2  "
              onClick={getAllOrders}
            >
              {/* <a href="/dashboard-admin/search-order">Consultar pedidos</a> */}
              Consultar Pedidos
            </button>
          </div>

          <div className=" flex justify-center w-full md:w-auto">
            {/* <h1 className="text-base">Buscar Pedido</h1> */}
            <button
              type="button"
              className="text-Buscar Pedidos text-first hover:text-white border border-first hover:bg-first focus:ring-4 focus:outline-none focus:ring-first font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2  "
            >
              <a href="/dashboard-admin/search-order">Buscar Pedidos</a>
            </button>
          </div>

          <div className=" flex justify-center w-full md:w-auto">
            {/* <h1 className="text-base">cerrar sesion</h1> */}
            <button
              type="button"
              className="text-cerrar sesion text-first hover:text-white border border-first hover:bg-first focus:ring-4 focus:outline-none focus:ring-first font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2  "
            >
              <a href="/login">Cerrar sesion</a>
            </button>
          </div>
        </div>
      </div>
    </>
    ) 
};