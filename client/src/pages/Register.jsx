import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema } from "../features/auth/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/authApi";
import { useState } from "react";

const Register = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setSuccessMessage(data.message || "Registration successful");
    },
  });
  const onSubmit = (data) => {
    registerMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
        {successMessage && (
          <p className="mb-4 rounded-md bg-green-100 px-3 py-2 text-sm text-green-700">
            {successMessage}
          </p>
        )}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          <div>
            <label htmlFor="name" className="block mb-1 text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="Enter your name"
              {...register("name")}
              className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-gray-400"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              {...register("email")}
              placeholder="Enter your email"
              className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-gray-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="Create a password"
              {...register("password")}
              className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-gray-400"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-black px-4 py-2 text-white font-medium hover:bg-gray-800 transition-colors duration-300 cursor-pointer"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
