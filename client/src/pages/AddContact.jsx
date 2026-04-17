import DashboardLayout from "../components/layout/DashboardLayout";
import AddContactForm from "../components/ui/AddContactForm";

const AddContact = () => {
  return (
    <DashboardLayout>
      <section className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
            Add Contact
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Save a new contact to your CRM.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <AddContactForm />
        </div>
      </section>
    </DashboardLayout>
  );
};

export default AddContact;
