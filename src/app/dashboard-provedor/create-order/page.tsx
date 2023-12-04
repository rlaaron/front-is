"use client";
import axios from "axios";
import { Bread } from "./interfaces/bread";
import { useEffect, useState } from "react";
import { OrderItem } from "./interfaces/OrderItem";
import { Order } from '../../dashboard-admin/orders/interfaces/find-all-orders-response.interface';
export default function CreateOrderPage() {
  const [breads, setBreads] = useState<Bread[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedBread, setSelectedBread] = useState<Bread | null>(null);
  const [curentStep, setCurrentStep] = useState<
    "breadSelection" | "deliveryTimeSelection"
  >("breadSelection");
  const [deliveryTime, setDeliveryTime] = useState<string>("");
  const [success, setSuccess] = useState(false);

  const delyveryDates = ["2023-12-11", "2023-12-13", "2023-18-20"];
  const [order, setOrder] = useState<Order>();

  const handleAdd = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleLess = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  useEffect(() => {
    getBreads();
    getOrderStatus();
  }, [ ]);

  const getBreads = async () => {
    const url = "http://localhost:4000/api/Breads";
    const response = await axios.get(url);
    const data: Bread[] = response.data;
    console.log(data);
    setBreads(data);
  };

  const getBread = (id: string): Bread | null => {
    const bread = breads.find((bread) => bread.id === id);
    return bread || null;
  };

  const getOrderStatus = (): boolean => {
    return success;
  };

  const handleAddBread = () => {
    if (selectedBread) {
      const orderItem: OrderItem = {
        product_id: selectedBread.id,
        quantity,
      };
      setOrderItems((prev) => [...prev, orderItem]);
      setSelectedBread(null);
      setQuantity(1);
    }
  };

  const createOrder = async () => {
    const url = "http://localhost:4000/api/Orders";
    const requestDate = new Date();
    const token = localStorage.getItem("token");

    const deliveryDate = new Date(deliveryTime);

    const heders = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust content type as needed
    };
    const data = {
      request_date: requestDate,
      delivery_date: deliveryDate,
      orderItem: orderItems,
    };

    console.log(data);

    try {
      const response = await axios.post(url, data, { headers: heders });
      console.log(response.data);
      setSuccess(true);
      setOrder(response.data);
    } catch (error) {
        setSuccess(false);
      console.log(error);
    }
  };

  const handleContinue = () => {
    console.log("handleContinue");
    console.log(orderItems);
    setCurrentStep("deliveryTimeSelection");
  };

  return (
    <>
      {curentStep === "deliveryTimeSelection" && (
        <>
          {/* Add UI for delivery time selection here */}
          <div className="min-h-screen  bg-white pt-60">
            <div className="mb-4 p-6">
              <label className="mr-4">Select Bread:</label>
              <select
                // onChange={(e) => setSelectedBread(delyveryDates)}
                onChange={(e) => setDeliveryTime(e.target.value)}
                // value={selectedBread?.id || ""}
                value={deliveryTime}
                className="p-2 border border-gray-300 rounded-2xl"
              >
                <option value="">Select a delivery date</option>

                {delyveryDates.map((date) => (
                  <option key={date} value={date} className="rounded-2xl">
                    {date}
                  </option>
                  // <option key={date} value={date} className="rounded-2xl">
                ))}
              </select>
            </div>
            <div className="pl-24">
            <button
              onClick={createOrder}
              className="px-4 py-2 bg-indigo-500 text-white mt-4"
            >
              Create Order
            </button>
            </div>
            
          </div>
        </>
      )}

      {curentStep === "breadSelection" && (
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="container mx-auto pl-24">
            <div className="mb-4">
              <label className="mr-4">Select Bread:</label>
              <select
                onChange={(e) => setSelectedBread(getBread(e.target.value))}
                value={selectedBread?.id || ""}
                className="p-2 border border-gray-300 rounded-2xl"
              >
                <option value="">Select a bread</option>
                {breads.map((bread) => (
                  <option
                    key={bread.id}
                    value={bread.id}
                    className="rounded-2xl"
                  >
                    {bread.flavor}
                  </option>
                ))}
              </select>
            </div>

            {selectedBread && (
              <div className="mb-4">
                <label className="mr-4">Quantity:</label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleLess}
                    className="px-4 py-2 bg-gray-300 rounded-full"
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={handleAdd}
                    className="px-4 py-2 bg-gray-300 rounded-full"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={handleAddBread}
              className="px-4 py-2 bg-first text-white mr-4 rounded-2xl"
            >
              Add Bread
            </button>
            <button
              onClick={handleContinue}
              className="px-4 py-2 bg-orange-400 text-white rounded-2xl"
            >
              Continue
            </button>
          </div>
        </div>
      )}


      {success && (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="container mx-auto pl-24">
                <h1 className="text-center text-4xl font-bold mb-8">Order Created Successfully!</h1>
                <p className="text-center text-2xl mb-8">Order number: {order?.id}.</p>
                <p className="text-center text-2xl mb-8">Thank you for your order. We appreciate your business.</p>
                <button className="px-4 py-2 bg-first text-white mr-4 rounded-2xl">
                    Go to Home
                </button>
            </div>

        </div>
      )}
    </>
  );
}
