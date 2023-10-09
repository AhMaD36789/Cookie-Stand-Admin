import React from "react";

type CookieStand = {
  location: string;
  hourly_sales: number[];
};

type ReportTableProps = {
  hours: string[];
  reports: CookieStand[];
};

const ReportTable: React.FC<ReportTableProps> = ({ hours, reports }) => {
  if (reports.length === 0) {
    return <h2>No Cookie Stands Available</h2>;
  }

  const totalCookiesPerHour = hours.map((_, i) =>
    reports.reduce((sum, report) => sum + report.hourly_sales[i], 0)
  );

  const totalCookies = totalCookiesPerHour.reduce(
    (sum, numCookies) => sum + numCookies,
    0
  );

  return (
    <div className="flex justify-center items-center mb-10">
      <table className="block divide-gray-200">
        <thead className="bg-green-500">
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
        <tbody className="bg-white divide-y divide-gray-200">
          {reports.map((report, i) => (
            <tr key={i}>
              <td className="px-6 py-4 whitespace-nowrap">{report.location}</td>
              {report.hourly_sales.map((sale, j) => (
                <td key={j} className="px-6 py-4 whitespace-nowrap">
                  {sale}
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap">
                {report.hourly_sales.reduce((a, b) => a + b, 0)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-green-500">
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
