'use client';
import React, { useRef } from "react";

// type FormData = {
//   [key: string]: string | number;
// };


type FormData = {
  location: string;
  hourly_sales: number[];
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const formData: FormData = {
    //   location: locationRef.current?.value || "",
    //   minCustomers: Number(minCustomersRef.current?.value) || 0,
    //   maxCustomers: Number(maxCustomersRef.current?.value) || 0,
    //   avgCookies: Number(avgCookiesRef.current?.value) || 0,
    // };

    const formData: FormData = {
      location: locationRef.current?.value || "",
      hourly_sales: [48, 42, 30, 24, 42, 24, 36, 42, 42, 48, 36, 42, 24, 36],
    };
    addRow(formData);
     onCreate(formData);
  };

  return (
    <div className="flex flex-col items-center my-5 justify-center bg-grey-100">
      <form className="w-full max-w-xl bg-[#66d6a9] shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <h2 className="block text-gray-800 text-lg font-bold mb-2">
          Create Cookie Stand
        </h2>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Location{" "}
          <input
            ref={locationRef}
            className="shadow appearance-none border rounder w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shoadow-outline"
            type="text"
            name="location"
          />{" "}
        </label>
        <div className="flex space-x-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Min Customers Per Hour:{" "}
            <input
              ref={minCustomersRef}
              className="shadow appearance-none border rounder w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shoadow-outline"
              type="number"
              name="minCustomers"
            />
          </label>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Max Customers Per Hour:{" "}
            <input
              ref={maxCustomersRef}
              className="shadow appearance-none border rounder w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shoadow-outline"
              type="number"
              name="maxCustomers"
            />
          </label>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Avg Cookies Per Sale:{" "}
            <input
              ref={avgCookiesRef}
              className="shadow appearance-none border rounder w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shoadow-outline"
              type="number"
              name="avgCookies"
            />
          </label>
          <button
            className="bg-[#50a885] hover:bg-[#479475] fond-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline self-end"
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
