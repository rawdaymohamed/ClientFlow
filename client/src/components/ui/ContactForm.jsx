import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addContactSchema } from "../../features/clients/client.schema";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const inputStyles =
  "block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm transition focus:border-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-100";

const labelStyles = "mb-2 block text-sm font-medium text-gray-700";
const errorStyles = "mt-2 text-sm text-red-600";

const EMPTY_CONTACT_VALUES = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
};

const ContactForm = ({
  defaultValues = EMPTY_CONTACT_VALUES,
  onSubmit,
  isPending = false,
  submitLabel = "Save Contact",
}) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addContactSchema),
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className={labelStyles}>
            First name
          </label>
          <input
            id="firstName"
            type="text"
            placeholder="Enter first name"
            {...register("firstName")}
            className={inputStyles}
          />
          {errors.firstName && (
            <p className={errorStyles}>{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className={labelStyles}>
            Last name
          </label>
          <input
            id="lastName"
            type="text"
            placeholder="Enter last name"
            {...register("lastName")}
            className={inputStyles}
          />
          {errors.lastName && (
            <p className={errorStyles}>{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={labelStyles}>
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="name@example.com"
            {...register("email")}
            className={inputStyles}
          />
          {errors.email && (
            <p className={errorStyles}>{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className={labelStyles}>
            Phone
          </label>
          <input
            id="phone"
            type="text"
            placeholder="+20 123 456 7890"
            {...register("phone")}
            className={inputStyles}
          />
          {errors.phone && (
            <p className={errorStyles}>{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="company" className={labelStyles}>
          Company
        </label>
        <input
          id="company"
          type="text"
          placeholder="Enter company name"
          {...register("company")}
          className={inputStyles}
        />
        {errors.company && (
          <p className={errorStyles}>{errors.company.message}</p>
        )}
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-5">
        <button
          type="button"
          onClick={() => navigate(-1)}
          disabled={isPending}
          className="inline-flex items-center rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-black focus:outline-none focus:ring-4 focus:ring-gray-200 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
        >
          {isPending ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
