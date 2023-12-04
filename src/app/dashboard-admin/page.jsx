"use client";
import { Oswald } from "next/font/google";

import { useState } from "react";
import { useRouter } from "next/router";
const inter = Oswald({ subsets: ["latin"] });
import axios from "axios";

export default function DashboardAdminPage() { 
  const [orders, setOrders] = useState([]);

  return (
    <>
      {/* <div className="flex items-center justify-center w-screen h-screen"> */}
      <div className = {`min-h-screen bg-white sm:py-12 w-full md:w-auto h-full text-black border-4 flex items-center justify-center ${inter.className}` }>
        <div className="grid gap-12 grid-cols-1 grid-rows-5">
          <div className= {`flex justify-center w-full md:w-auto x`}>
            {/* <h1 className="text-base">Consultar pedidos</h1> */}
            <button
              type="button"
              className="text-Consultar pedidos text-first hover:text-white border border-first hover:bg-first focus:ring-4 focus:outline-none focus:ring-first font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2  "
            >
              <a href="/dashboard-admin/orders">Consultar pedidos</a>
              {/* Consultar pedidos */}
            </button>
          </div>

          <div className=" flex justify-center w-full md:w-auto">
            {/* <h1 className="text-base">Buscar Pedido</h1> */}
            <button
              type="button"
              className="text-Buscar Pedido text-first hover:text-white border border-first hover:bg-first focus:ring-4 focus:outline-none focus:ring-first font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2  "
            >
              <a href="/dashboard-admin/search-order">Buscar Pedido</a>
            </button>
          </div>

          <div className=" flex justify-center w-full md:w-auto">
            {/* <h1 className="text-base">Crear Pedido</h1> */}
            <button
              type="button"
              className="text-Crear Pedido text-first hover:text-white border border-first hover:bg-first focus:ring-4 focus:outline-none focus:ring-first font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2  "
            >
              <a href="/dashboard-admin/create-provider">Crear Provedor</a>
            </button>
          </div>

          <div className=" flex justify-center w-full md:w-auto">
            {/* <h1 className="text-base">Consultar provedor activos</h1> */}
            <button
              type="button"
              className="text-Consultar provedor text-first hover:text-white border border-first hover:bg-first focus:ring-4 focus:outline-none focus:ring-first font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2  "
            >
              Consultar Provedor
            </button>
          </div>

          <div className=" flex justify-center w-full md:w-auto">
            {/* <h1 className="text-base">cerrar sesion</h1> */}
            <button
              type="button"
              class="text-cerrar sesion text-first hover:text-white border border-first hover:bg-first focus:ring-4 focus:outline-none focus:ring-first font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2  "
            >
              Cerrar Sesion
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
