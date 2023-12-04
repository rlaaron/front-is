"use client";
import { use, useEffect, useState } from "react";
import axios from "axios";
import { User } from "./interface/getAllUsers";

export default function FindAllClients() {
  const [clients, setClients] = useState<User[] | null>();

  const url = "http://localhost:4000/api/auth/users";

  useEffect(() => {
    getClients();
  }, []);

  const getClients = async () => {
    try {
      const response = await axios.get(url);
      const data: User[] = await response.data;
      setClients(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <body className="bg-gray-200 h-screen flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* <!-- User Card --> */}
        {clients?.map((client) => (
          <div key={client.id} className="bg-white p-4 rounded shadow-md">
            <p className="text-lg font-bold mb-2">Informacion de provedor:</p>
            <p>
              <span className="font-bold">ID:</span> {client.id}
            </p>
            <p>
              <span className="font-bold">Email:</span> {client.email}
            </p>
            <p>
              <span className="font-bold">Name:</span> {client.fullName}
            </p>
            <p>
              <span className="font-bold">Active:</span> {client.isActive}
            </p>
            <p>
              <span className="font-bold">Roles:</span> {client.roles.map((role) => (
                <span key={role} className="mr-1">{role}</span>
              ))}
            </p>
            <p>
              <span className="font-bold">Distribution Zone:</span>{" "}
              {client.distribution_zone}
            </p>
            <p>
              <span className="font-bold">Phone:</span> {client.phone}
            </p>
          </div>
        ))}
      </div>
    </body>
  );
}
