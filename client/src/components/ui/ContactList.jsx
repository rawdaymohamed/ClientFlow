import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteContact, getContacts } from "../../api/contactsApi";
import ConfirmModal from "./ContactModal";

const ContactList = () => {
  const [page, setPage] = useState(1);
  const [contactToDelete, setContactToDelete] = useState(null);
  const limit = 5;
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["contacts", page],
    queryFn: () => getContacts({ page, limit }),
    placeholderData: (previousData) => previousData,
  });

  const { mutate: removeContact, isPending: isDeleting } = useMutation({
    mutationFn: deleteContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      toast.success("Contact deleted successfully");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to delete contact.",
      );
    },
  });

  const contacts = data?.contacts ?? [];
  const pagination = data?.pagination;

  const handleDelete = (contactId) => {
    removeContact(contactId);
  };
  const confirmDelete = () => {
    if (!contactToDelete) return;

    removeContact(contactToDelete._id);
    setContactToDelete(null);
  };
  const handlePreviousPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  if (isLoading) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-500">Loading contacts...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 shadow-sm">
        <p className="text-sm text-red-600">
          {error?.response?.data?.message || "Failed to load contacts."}
        </p>
      </div>
    );
  }

  if (contacts.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900">No contacts yet</h3>
        <p className="mt-2 text-sm text-gray-500">
          Add your first contact to start building your CRM.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-20 sm:pb-0">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <ul className="divide-y divide-gray-200">
          {contacts.map((contact) => (
            <li
              key={contact._id}
              className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-900">
                  {contact.firstName} {contact.lastName}
                </h3>

                <div className="mt-1 flex flex-col gap-1 text-sm text-gray-500">
                  <span>{contact.email || "No email provided"}</span>
                  <span>{contact.phone || "No phone provided"}</span>
                  <span>{contact.company || "No company provided"}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:justify-end">
                <Link
                  to={`/contacts/${contact._id}/edit`}
                  className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  Edit
                </Link>

                <button
                  type="button"
                  onClick={() => setContactToDelete(contact)}
                  disabled={isDeleting}
                  className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
        <div className="text-sm text-gray-500">
          Page {pagination?.page || page}
          {pagination?.totalPages ? ` of ${pagination.totalPages}` : ""}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePreviousPage}
            disabled={page === 1 || isFetching}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>

          <button
            type="button"
            onClick={handleNextPage}
            disabled={
              pagination
                ? page >= pagination.totalPages || isFetching
                : contacts.length < limit || isFetching
            }
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
      <ConfirmModal
        isOpen={!!contactToDelete}
        title="Delete contact"
        description={
          contactToDelete
            ? `Are you sure you want to delete ${contactToDelete.firstName} ${contactToDelete.lastName}?`
            : ""
        }
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isDeleting}
        onCancel={() => setContactToDelete(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default ContactList;
