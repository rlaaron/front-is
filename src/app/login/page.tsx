"use client";
import { use, useEffect, useState } from "react";
import { Oswald } from "next/font/google";
import axios from "axios";
import logotipo from "../../../public/assets/logotipo.png";
import Image from "next/image";

export default function Login() {
  const [email, setEmail] = useState("email");
  const [password, setPassword] = useState("password");
  const [selected, setSelected] = useState("selected");
  const [jwt, setJwt] = useState("jwt");
  const [user, setUser] = useState("user");
  const [id, setId] = useState("id");

  const url = "http://localhost:4000/api/auth/login";
  const login = async () => {
    const data = {
      email: email,
      password: password,
    };
    const response = await axios.post(url, data);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", response.data.user);
    localStorage.setItem("id", response.data.id);
    localStorage.setItem("selected", selected);
    localStorage.setItem("userName", response.data.fullName);

    console.log(response.data);
    // console.error(response.data);

    setJwt(response.data.token);

    const role:string[] = response.data.roles;
    if (role.includes("admin")) {
      window.location.href = "/dashboard-admin";
    } else {
      window.location.href = "dashboard-provedor";
    }

    console.log(response.data);
  };

  const route = () => {
    // window.location.href = selected === "provedor" ? "/provedor" : "/administrador";
    console.log('test');
  };

  return (
    <>
      <div className = {`min-h-screen bg-white sm:py-12 w-screen  text-black h-full flex items-center `}>
        <div
          className="bg-white flex justify-center  items-center p-15 "
          style={{ width: "100%", height: "95%" }}
        >
          <div className="mb-20 w-100% h-100%">
            <div className=" fill-first mb-10 m-auto stroke-first w-full">
              <Image
                className="ml-2"
                src={logotipo}
                alt="Logotipo"
                width={200}
                height={200}
                // priority
              />
              <p className="text-first font-extrabold text-2xl w-auto text-center">
                TROSSET
              </p>
            </div>

            <h1 className="font-bold text-left text-3xl mb-5 text-first">
              Iniciar Sesion
            </h1>

            {/* <div className="inline-flex rounded-md shadow-sm w-full">
              <button
                type="button"
                key={"provedor"}
                className={`px-5 py-1 text-sm font-medium border border-first rounded-l-lg ${
                  selected === "provedor"
                    ? "bg-first text-white"
                    : "bg-third text-first"
                } w-50%`}
                onClick={() => setSelected("provedor")}
              >
                Provedor
              </button>
              <button
                type="button"
                key={'Administrador'}
                className={`px-8 py-1 text-sm font-medium border border-first rounded-r-lg ${
                  selected === 'Administrador'
                    ? 'bg-first text-white'
                    : 'bg-third text-first'
                } w-50%`}
                onClick={() => setSelected('Administrador')}
              >
                Administrador
              </button>
            </div> */}

            <div className="relative z-0 flex mb-4 mt-10">
              <input
                type="text"
                id="floating_standard"
                className="block py-2.5 px-0 w-full text-sm text-fiveth bg-transparent border-0 border-b-2 border-first appearance-none dark:text-black dark:border-first dark:focus:border-first focus:outline-none focus:ring-0 focus:border-first peer"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label
                htmlFor="floating_standard"
                className="absolute text-sm text-fifth dark:text-fifth duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-fifth peer-focus:dark:text-fifth peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >

                Usuario
              </label>
            </div>

            <div className="relative z-0">
              <input
                type="password"
                id="floating_standard"
                className="block py-2.5 px-0 w-full text-sm text-fiveth bg-transparent border-0 border-b-2 border-first appearance-none dark:text-black dark:border-first dark:focus:border-first focus:outline-none focus:ring-0 focus:border-first peer"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label
                htmlFor="floating_standard"
                className="absolute text-sm text-fifth dark:text-fifthduration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-fifth peer-focus:dark:text-fifth peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Contraseña
              </label>
            </div>

            <div className="bg-white mt-10 rounded-lg ">
              <button
                
                // onClick={route}
                onClick={login}
                type="button"
                className="bg-first text-third w-full py-2.5  rounded-lg text-sm shadow-xl hover:shadow-2xl font-semibold text-center inline-block"
              >
                <span className="inline-block mr-2">Login</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 inline-block"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>


          </div>
        </div>
      </div>
    </>
  );
}
