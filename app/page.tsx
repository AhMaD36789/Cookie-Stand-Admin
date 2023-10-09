"use client";
import React, { useState } from "react";
import CreateForm from "./components/CookieStandAdmin/CreateForm";
import ReportTable from "./components/CookieStandAdmin/ReportTable";
import Footer from "./components/Layout/Footer";

type CookieStand = {
  id?: number;
  location: string;
  hourlySales: number[];
  description: string;
  minimumCustomerPerHour: number;
  maximumCustomerPerHour: number;
  averageCookiesPerSale: number;
  owner?: string;
};

const Admin: React.FC = () => {
  const [reports, setReports] = useState<CookieStand[]>([]);
  const hours = [
    "6am",
    "7am",
    "8am",
    "9am",
    "10am",
    "11am",
    "12pm",
    "1pm",
    "2pm",
    "3pm",
    "4pm",
    "5pm",
    "6pm",
    "7pm",
  ];

  const addRow = (data: CookieStand) => {
    setReports([...reports, data]);
  };

  const onCreate = (data: CookieStand) => {
    setReports([...reports, data]);
  };

  return (
    <div>
      <CreateForm addRow={addRow} onCreate={onCreate} />
      <ReportTable hours={hours} reports={reports} setReports={setReports} />
      <Footer numLocations={reports.length} />
    </div>
  );
};

export default Admin;
