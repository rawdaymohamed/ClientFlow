// components/ui/AddContactForm.jsx
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createContact } from "../../api/contactsApi";
import toast from "react-hot-toast";
import ContactForm from "./ContactForm";

const AddContactForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createContact,
    onSuccess: () => {
      toast.success("Contact created successfully");
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      queryClient.invalidateQueries({ queryKey: ["contacts-metric"] });
      navigate("/contacts");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to create contact.",
      );
    },
  });

  return (
    <ContactForm
      onSubmit={(data) => mutate(data)}
      isPending={isPending}
      submitLabel="Save Contact"
    />
  );
};

export default AddContactForm;
