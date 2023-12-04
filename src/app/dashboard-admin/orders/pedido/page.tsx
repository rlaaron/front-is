"use client";
import { useRouter } from "next/router";
import {
  Order,
  OrderItem,
} from "../interfaces/find-all-orders-response.interface";
import { useEffect, useState } from "react";
export default function OrderDetails() {
  const [order, setOrder] = useState<Order | null>(null);
  useEffect(() => {
    getOrder();
  }, []);

  const getOrder = () => {
    if(localStorage.getItem("OrdersBySearch") == null){
      const orderString: string | null = localStorage.getItem("order");
      if (orderString) {
        const order: Order = JSON.parse(orderString);
        console.log(order);
        setOrder(order);
      }
    }else{
      const orderString: string | null = localStorage.getItem("OrdersBySearch");
      if (orderString) {
        const order: Order = JSON.parse(orderString);
        console.log(order);
        setOrder(order);
      }
    }
  }

  let orderItems: OrderItem[] = [];
  if (order) {
    orderItems = order.orderItem;
  }
  return (
    <div className="bg-white">
      <div className="grid grid-cols-1 gap-0 justify-center items-start min-w-screen min-h-screen m-5 ">
        <div className="grid grid-cols-2 gap-0 justify-center items-center detail-Order m">
          <div className="order-number flex justify-center items-center">
            {"Nº Orden: "}
            {order?.id}
          </div>
          <div className="order-date flex justify-center items-center">
            {"Fecha: "}
            {order?.request_date}

          </div>
          <div className="order-date flex justify-center items-center p-1">
            {"Nombre de provedor:"}
            {order?.user.name}
          </div>
        </div>

        {orderItems.map((orderItem: OrderItem) => (
          <div
            key={`${orderItem.bread}`}
            className="grid grid-cols-2 gap-0 items"
          >
            <div className="breadName justify-self-center items-center">
              {orderItem.bread}
            </div>
            <div className="quanty justify-self-center items-center">
              {orderItem.quantity}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
