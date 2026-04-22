import React, { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { Link } from "react-router-dom";
import ContactList from "../components/ui/ContactList";
import { getContactsMetric } from "../api/contactsApi";
import { useQuery } from "@tanstack/react-query";
import MetricCard from "../components/ui/MetricCard";

const Contacts = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["contacts-metric"],
    queryFn: getContactsMetric,
  });

  const totalContacts = data?.totalContacts ?? 0;

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Contacts</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage and organize your client contacts.
          </p>
        </div>

        <Link
          to="/contacts/new"
          className="hidden rounded-lg bg-black px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-gray-800 sm:inline-flex"
        >
          + Add Contact
        </Link>
      </div>

      {/* Metric row */}
      <div className="mb-5">
        <MetricCard
          title="Total Contacts"
          value={isLoading ? "..." : totalContacts}
          subtitle={
            isError
              ? "Could not load contact count"
              : totalContacts === 0
                ? "No contacts yet — add your first one"
                : "Contacts currently stored in your CRM"
          }
        />
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-gray-400"
        />
      </div>

      {/* Mobile FAB */}
      <Link
        to="/contacts/new"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-medium text-white shadow-lg transition hover:bg-gray-800 sm:hidden"
      >
        + Add
      </Link>

      <ContactList searchTerm={searchTerm} />
    </DashboardLayout>
  );
};

export default Contacts;
