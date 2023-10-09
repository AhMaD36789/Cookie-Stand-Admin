import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

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

type ReportTableProps = {
  hours: string[];
  reports: CookieStand[];
  setReports: React.Dispatch<React.SetStateAction<CookieStand[]>>;
};

const ReportTable: React.FC<ReportTableProps> = ({
  hours,
  reports,
  setReports,
}) => {
  useEffect(() => {
    console.log("Fetching data on page load...");
    getAllData();
  }, []);

  const getAllData = async () => {
    try {
      const response = await axios.get(
        `https://salmoncookieapplicationapi20231007222023.azurewebsites.net/api/CookieStands`
      );
      console.log("Fetched data:", response.data);
      setReports(response.data); // Update reports with fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteCookieStand = async (id: number | undefined) => {
    if (!id) return; // Ensure id is not undefined
    console.log("Deleting item with id:", id);
    try {
      await axios
        .delete(
          `https://salmoncookieapplicationapi20231007222023.azurewebsites.net/api/CookieStands/${id}`
        )
        .then(() => {
          console.log("Deleted item, refreshing data...");
          getAllData(); // Refresh data
        })
        .catch((error) => {
          console.error("Error deleting item:", error);
        });
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  if (reports.length === 0) {
    return <h2>No Cookie Stands Available</h2>;
  }

  const totalCookiesPerHour = hours.map((_, i) =>
    reports.reduce(
      (sum, report) =>
        sum + (Array.isArray(report.hourlySales) ? report.hourlySales[i] : 0),
      0
    )
  );

  const totalCookies = totalCookiesPerHour.reduce(
    (sum, numCookies) => sum + numCookies,
    0
  );

  return (
    <div className="flex justify-center items-center mb-10">
      <table className="block divide-gray-200">
        <thead className="bg-green-600">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Location
            </th>
            {hours.map((hour, i) => (
              <th
                key={i}
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                {hour}
              </th>
            ))}
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Totals
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-black">
          {reports.map((report, i) => (
            <tr
              key={i}
              className={i % 2 === 0 ? "bg-green-300" : "bg-green-500"}
            >
              <td className="px-6 py-4 whitespace-nowrap flex justify-between">
                <div>{report.location}</div>
                <div>
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => report.id && deleteCookieStand(report.id)}
                    className="hover:text-red-500 ml-5"
                    width={10}
                  />
                </div>
              </td>
              {Array.isArray(report.hourlySales) &&
                report.hourlySales.map((sale, j) => (
                  <td key={j} className="px-6 py-4 whitespace-nowrap">
                    {sale}
                  </td>
                ))}
              <td className="px-6 py-4 whitespace-nowrap">
                {Array.isArray(report.hourlySales)
                  ? report.hourlySales.reduce((a, b) => a + b, 0)
                  : 0}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-green-600">
          <tr>
            <td className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Totals
            </td>
            {totalCookiesPerHour.map((total, i) => (
              <td
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                key={i}
              >
                {total}
              </td>
            ))}
            <td>{totalCookies}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ReportTable;