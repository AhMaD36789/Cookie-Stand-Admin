"use client";
import axios from "axios";
import React, { useRef } from "react";

type FormData = {
  id?: number;
  location: string;
  hourlySales: number[];
  description: string;
  minimumCustomerPerHour: number;
  maximumCustomerPerHour: number;
  averageCookiesPerSale: number;
  owner?: string;
};

type CreateFormProps = {
  onCreate: (data: FormData) => void;
  addRow: (data: FormData) => void;
};

const CreateForm: React.FC<CreateFormProps> = ({ addRow, onCreate }) => {
  const locationRef = useRef<HTMLInputElement>(null);
  const minCustomersRef = useRef<HTMLInputElement>(null);
  const maxCustomersRef = useRef<HTMLInputElement>(null);
  const avgCookiesRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const ownerRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData: FormData = {
      location: locationRef.current?.value || "",
      minimumCustomerPerHour: Number(minCustomersRef.current?.value) || 0,
      maximumCustomerPerHour: Number(maxCustomersRef.current?.value) || 0,
      averageCookiesPerSale: Number(avgCookiesRef.current?.value) || 0,
      hourlySales: [],
      description: descriptionRef.current?.value || "",
      owner: ownerRef.current?.value || "",
    };

    addRow(formData);
    try {
      const response = await axios.post(
        "https://salmoncookieapplicationapi20231007222023.azurewebsites.net/api/CookieStands",
        formData
      );
      onCreate(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("axios error: ", error);
    }
  };

  return (
    <div className="flex flex-col items-center my-5 justify-center bg-grey-100">
      <form
        className="w-full max-w-xl bg-green-500 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <h2 className="block text-gray-800 text-lg font-bold mb-2">
          Create Cookie Stand
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Location{" "}
            <input
              ref={locationRef}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="location"
            />{" "}
          </label>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Min Customers Per Hour:{" "}
            <input
              ref={minCustomersRef}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              name="minCustomers"
            />
          </label>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Max Customers Per Hour:{" "}
            <input
              ref={maxCustomersRef}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              name="maxCustomers"
            />
          </label>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Avg Cookies Per Sale:{" "}
            <input
              ref={avgCookiesRef}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              name="avgCookies"
            />
          </label>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description:{" "}
            <input
              ref={descriptionRef}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="description"
            />
          </label>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Owner:{" "}
            <input
              ref={ownerRef}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="owner"
            />
          </label>
          <button
            className="bg-green-400 hover:bg-green-600 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline self-end mt-4 col-span-full"
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );

};

export default CreateForm;
