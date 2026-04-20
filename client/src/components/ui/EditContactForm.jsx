// components/ui/EditContactForm.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ContactForm from "./ContactForm";
import { getContactById, updateContact } from "../../api/contactsApi";

const EditContactForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["contact", id],
    queryFn: () => getContactById(id),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (formData) => updateContact(id, formData),
    onSuccess: () => {
      toast.success("Contact updated successfully");
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      queryClient.invalidateQueries({ queryKey: ["contact", id] });
      navigate("/contacts");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to update contact.",
      );
    },
  });

  if (isLoading) {
    return <p>Loading contact...</p>;
  }

  if (isError) {
    return <p>Failed to load contact.</p>;
  }

  const contact = data?.contact;

  return (
    <ContactForm
      defaultValues={{
        firstName: contact?.firstName || "",
        lastName: contact?.lastName || "",
        email: contact?.email || "",
        phone: contact?.phone || "",
        company: contact?.company || "",
      }}
      onSubmit={(formData) => mutate(formData)}
      isPending={isPending}
      submitLabel="Update Contact"
    />
  );
};

export default EditContactForm;
