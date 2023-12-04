"use client";
import { useState } from "react";
import axios from "axios";

export default function CreateProviderPage() {
  const [email, setEmail] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [distributionZone, setDistributionZone] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean | null>(null);
  const [isPhoneValid, setIsPhoneValid] = useState<boolean | null>(null);
  const [isFullNameValid, setIsFullNameValid] = useState<boolean | null>(null);
  const [isDistributionZoneValid, setIsDistributionZoneValid] = useState<
    boolean | null
  >(null);

  const [dataCorrect, setDataCorrect] = useState<boolean | null>(null);

  const [userCreate, setUserCreate] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isEmail = (input: string): boolean => {
    // Regular expression for a simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };
  const validatePassword = (password: string): boolean => {
    // Regular expression for password validation
    const passwordRegex =
      /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*/;
  
    // Check if the password matches the criteria
    return passwordRegex.test(password);
  };
  
  const isPhone = (input: string): boolean => {
    // Regular expression for phone number validation in Mexico
    const phoneRegex = /^(\+\d{1,2}\s?)?(\d{10}|\d{3}[-\s]\d{3}[-\s]\d{4})$/;
    return phoneRegex.test(input);
  };
  

  const isFullName = (input: string): boolean => {
    // Regular expression for a simple email validation
    const fullNameRegex = /^[a-zA-Z ]+$/;
    return fullNameRegex.test(input);
  };

  const isDistributionZone = (input: string): boolean => {
    // Regular expression for a simple email validation
    const distributionZoneRegex = /^[a-zA-Z ]+$/;
    return distributionZoneRegex.test(input);
  };

  const validateData = () => {
    if (
      isEmailValid &&
      isPasswordValid &&
      isPhoneValid &&
      isFullNameValid &&
      isDistributionZoneValid
    ) {
      setDataCorrect(true);
    } else {
      setDataCorrect(false);
    }
  };

  const url = "http://localhost:4000/api/auth/register";

  const createProvider = async () => {
    setIsEmailValid(isEmail(email));
    setIsPasswordValid(validatePassword(password));
    setIsPhoneValid(isPhone(phone));
    setIsFullNameValid(isFullName(fullName));
    setIsDistributionZoneValid(isDistributionZone(distributionZone));

    validateData();

    // if (isEmail && isPassword && isPhone && isFullName && isDistributionZone) {
    if (
      // isEmailValid &&
      // isPasswordValid &&
      // isPhoneValid &&
      // isFullNameValid &&
      // isDistributionZoneValid
      dataCorrect
    ) {
      try {
        // const numberPhone = +phone;
        console.log(phone);
        console.log(typeof phone);
        
        const response = await axios.post(url, {
          email,
          password,
          fullName,
          distribution_zone: distributionZone,
          phone,
          roles: ["user", "provedor"],
        });

        const data = response.data;
        if (data.isActive) {
          console.log(`Registration successful: ${data.message}`);
          
          setUserCreate(true);
        } else {
          console.log(`Registration unsuccessfully: ${data.message}`);
          setUserCreate(false);
          // Provide feedback to the user about the failure
          console.log(`Registration failed: ${data.message}`);
        }

        console.log(data);
      } catch (error) {
        setUserCreate(false);
        console.error("Registration error:", error);
      }
    } else {
      // Provide feedback to the user about validation errors
      console.log(
        // `Validation failed: Email(${isEmail}), Password(${isPassword}), Phone(${isPhone}), FullName(${isFullName}), DistributionZone(${isDistributionZone})`
        `Validation failed: Email(${isEmailValid}), Password(${isPasswordValid}), Phone(${isPhoneValid}), FullName(${isFullNameValid}), DistributionZone(${isDistributionZoneValid})`
      );
    }
  };

  return (
    // <>
    <div className="bg-white-200 min-h-full  flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        {/* <!-- Email Input --> */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {isEmailValid === false && (
            <p className="text-red-500 text-xs italic">
              Please enter a valid email address.
            </p>
          )}
        </div>

        {/* <!-- Full Name Input --> */}
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Full Name:
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          {isFullNameValid === false && (
            <p className="text-red-500 text-xs italic">
              Please enter a valid full name.
            </p>
          )}
        </div>

        {/* <!-- Distribution Zone Input --> */}
        <div className="mb-4">
          <label
            htmlFor="distributionZone"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Distribution Zone:
          </label>
          <input
            type="text"
            id="distributionZone"
            name="distributionZone"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            value={distributionZone}
            onChange={(e) => setDistributionZone(e.target.value)}
          />
          {isDistributionZoneValid === false && (
            <p className="text-red-500 text-xs italic">
              Please enter a valid distribution zone.
            </p>
          )}
        </div>

        {/* <!-- Phone Input --> */}
        <div className="mb-6">
          <label
            htmlFor="phone"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Phone:
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {isPhoneValid === false && (
            <p className="text-red-500 text-xs italic">
              Please enter a valid phone.
            </p>
          )}
        </div>
        {/* <!-- Password Input --> */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password:
          </label>
          <input
            type="tel"
            id="password"
            name="password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isPasswordValid === false && (
            <p className="text-red-500 text-xs italic">
              Please enter a valid password.
            </p>
          )}
        </div>

        {/* <!-- Submit Button --> */}
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-600"
            onClick={createProvider}
          >
            Submit
          </button>
          {userCreate === true && (
            <p className="text-green-500 text-xs italic">
              User created successfully.
            </p>
          ) }
          {userCreate === false && (
            <p className="text-red-500 text-xs italic">
              User not created.
              {error && <p>{error}</p>}
            </p>
          ) }
          {dataCorrect === true && (
            <p className="text-green-500 text-xs italic">
              Data correct.
            </p>
          )}
        </div>
      </div>
    </div>
    // </>
  );
}
