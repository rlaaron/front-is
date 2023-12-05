"use client";
import { useRouter } from "next/router";
import { ReactNode, use, useEffect, useState } from "react";
import axios from "axios";
import { type } from "os";
import {
  Order,
  OrderItem,
  User,
} from "./interfaces/find-all-orders-response.interface";
import Link from "next/link";

export default function ConsultOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [id, setId] = useState("id");
  const [userID, setUserID] = useState("userID");
  const [userName, setUserName] = useState("userName");
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  //   const router = useRouter();
  //   const router = useRouter();

  useEffect(() => {
    getAllOrders();
    localStorage.setItem("allOrders", "false");
    localStorage.setItem("searchByClient", "false");
    localStorage.setItem("search", "false");

    // cleanData();
    // return () => {}; // cleanup function
  }, []);

  async function getAllOrders() {
    console.log(`allOrders: ${localStorage.getItem("allOrders")}, searchByClient: ${localStorage.getItem("searchByClient")}, search: ${localStorage.getItem("search")}` );
    
    if (localStorage.getItem("allOrders") == "true") {
      try {
        const url = "http://localhost:4000/api/Orders";
        const response = await axios.get(url);
        const data: Order[] = response.data;
        console.log(data);

        setOrders(data);
        // localStorage.setItem("allOrders", "false");
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    } 

    if (localStorage.getItem("searchByClient") == "true") {
      try {
        const termSearch = localStorage.getItem("OrdersByClient");
        const url = `http://localhost:4000/api/Orders/${termSearch}`;
        const response = await axios.get(url);
        const data: Order[] = response.data;
        console.log(data);
        setOrders(data);
        // localStorage.setItem("searchByClient", "false");
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }

    if(localStorage.getItem("search") == "true"){
      const data = JSON.parse(localStorage.getItem("OrdersBySearch")!);
      setOrders(data);
      console.log(data);
      
      // localStorage.setItem("search", "false");
    }





    // userNAme si es llamdo por cliente debi de tener user name
    // termsearhsi es llamado por term search debo de tener uudi or username
    // admin i es llamado por admin debo obtener toda la data
  }

  const cleanData = async() => {
    const data:Order[] = [];
    setOrders(data)
  }

  const sendOrderDetails = (order: Order) => {
    localStorage.setItem("order", JSON.stringify(order));
    // router.push(`/pedido`);
    window.location.href = "/dashboard-admin/orders/pedido";
  };

  return (
    <>
      <div className="min-h-screen bg-white sm:py-12 w-screen text-black h-full flex items-center justify-center">
        <div className="grid grid-rows-1 grid-cols-1 justify-center content-center justify-items-center items-center gap-6">
          {orders.map((order: Order) => (
            <div key={`${order.id}`} className=" ">
              <div className="container grid place-content-center ml-2 border">
                <div className="grid grid-rows-[0.7fr,1.3fr]">
                  <div className="data grid grid-cols-[1fr,1fr]">
                    <div className="justify-self-center items-center text-xs font-bold border">
                      {" Nº Orden:"}
                      {order.id}{" "}
                    </div>
                    <div className="justify-self-center items-center text-xs font-bold border">
                      {" Fecha: "}
                      {order.request_date}
                    </div>
                  </div>
                  <div
                    className="justify-self-center items-center"
                    onClick={() => sendOrderDetails(order)}
                  >
                    {" "}
                    {order.user.name}{" "}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// {orders.map((order: Order) => (
//     <div key={`${order.id}`} className="">
//       <Link href={`/order-details/${order.id}`} >

//           <div className="container grid place-content-center ml-2 border">
//             <div className="grid grid-rows-[0.7fr,1.3fr]">
//               <div className="data grid grid-cols-[1fr,1fr]">
//                 <div className="justify-self-center items-center text-xs font-bold border">
//                   {" Nº Orden:"}
//                   {order.id}{" "}
//                 </div>
//                 <div className="justify-self-center items-center text-xs font-bold border">
//                   {" Fecha: "}
//                   {order.request_date}
//                 </div>
//               </div>
//               <div className="justify-self-center items-center">
//                 {" "}
//                 {order.user.name}{" "}
//               </div>
//             </div>
//           </div>

//       </Link>
//     </div>
//   ))}
