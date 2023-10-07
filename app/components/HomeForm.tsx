'use client';
import React, { useState } from "react";

type FormData = {
  [key: string]: string | number;
};

const HomeForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({});
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmittedData(formData);
  };  

  return (
    <div className="flex flex-col items-center my-5 justify-center bg-grey-100">
      <form className="w-full max-w-xl bg-[#66d6a9] shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <h2 className="block text-gray-800 text-lg font-bold mb-2">Create Cookie Stand</h2>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Location <input className="shadow appearance-none border rounder w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shoadow-outline" type="text" name="location" onChange={handleChange} />{" "}
        </label>
        <div className="flex space-x-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Min Customers Per Hour:{" "}
            <input className="shadow appearance-none border rounder w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shoadow-outline" type="number" name="minCustomers" onChange={handleChange} />
          </label>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Max Customers Per Hour:{" "}
            <input className="shadow appearance-none border rounder w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shoadow-outline" type="number" name="maxCustomers" onChange={handleChange} />
          </label>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Avg Cookies Per Sale:{" "}
            <input className="shadow appearance-none border rounder w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shoadow-outline" type="number" name="avgCookies" onChange={handleChange} />
          </label>
          <button className="bg-[#50a885] hover:bg-[#479475] fond-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline self-end" type="submit" >
            Create
          </button>
        </div>
      </form>
      {submittedData && (
        <div>
          <p className="text-gray-800">Report Table Coming Soon</p>
          <pre className="text-gray-800">{JSON.stringify(submittedData)}</pre>
        </div>
      )}
    </div>
  );
};

export default HomeForm;