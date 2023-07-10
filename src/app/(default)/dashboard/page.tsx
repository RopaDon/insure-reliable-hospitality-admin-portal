export const metadata = {
  title: "Dashboard",
  description: "Page description",
};

import WelcomeBanner from "./welcome-banner";
import FintechCard01 from "./fintech-card-01";
import FintechCard02 from "./fintech-card-02";
import FintechCard03 from "./fintech-card-03";
import FintechCard04 from "./fintech-card-04";
import Datepicker from "@/components/datepicker";
import DashboardCard01 from "./dashboard-card-01";
import DashboardCard02 from "./dashboard-card-02";
import DashboardCard03 from "./dashboard-card-03";
import DashboardAvatars from "./dashboard-avatars";
import FilterButton from "@/components/dropdown-filter";

export default function Dashboard() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      <WelcomeBanner />
      {/* Dashboard actions */}
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        {/* Left: Avatars */}
        <DashboardAvatars />
        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          {/* Filter button */}
          <FilterButton align="right" />
          {/* Datepicker built with flatpickr */}
          {/* <Datepicker onDateChange={(date) => console.log(date)} align="right" /> */}
          {/* Add view button */}
          <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
            <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="hidden xs:block ml-2">Add View</span>
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-12 gap-6">
        {/* Line chart (Acme Plus) */}
        <DashboardCard01 />
        {/* Line chart (Acme Advanced) */}
        <DashboardCard02 />
        {/* Line chart (Acme Professional) */}
        <DashboardCard03 />
        {/* Line chart (Portfolio Returns) */}
        <FintechCard01 />
        {/* Credit Card */}
        <FintechCard02 />
        {/* Bar chart (Cash Flow) */}
        <FintechCard03 />
        {/* Horizontal bar chart (Cash Flow by Account) */}
        <FintechCard04 />
        {/* Table (Recent Expenses) */}
      </div>
    </div>
  );
}
