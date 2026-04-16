import React from "react";
import DashboardLayout from "../components/layout/DashboardLayout";

const Contacts = () => {
  return (
    <DashboardLayout>
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800">Contacts</h2>
        <p className="mt-2 text-sm text-gray-500">
          Your contacts will appear here.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default Contacts;
