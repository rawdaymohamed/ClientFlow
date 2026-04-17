import React from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { Link } from "react-router-dom";

const Contacts = () => {
  return (
    <DashboardLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Contacts</h2>
          <p className="mt-1 text-sm text-gray-500">
            Your contacts will appear here.
          </p>
        </div>

        {/* Desktop Add Button */}
        <Link
          to="/contacts/new"
          className="hidden rounded-lg bg-black px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-gray-800 sm:inline-flex"
        >
          + Add Contact
        </Link>
      </div>

      {/* Mobile FAB */}
      <Link
        to="/contacts/new"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-medium text-white shadow-lg hover:bg-gray-800 sm:hidden"
      >
        + Add
      </Link>
    </DashboardLayout>
  );
};

export default Contacts;
