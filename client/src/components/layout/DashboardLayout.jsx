import { Link, useNavigate, NavLink } from "react-router-dom";
import { logoutUser } from "../../api/authApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.clear();
      navigate("/login");
    },
  });
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b bg-white px-6 py-4 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              to="/dashboard"
              className="text-lg font-semibold text-gray-800"
            >
              ClientFlow
            </Link>
            <nav className="flex items-center gap-4 text-sm text-gray-600">
              <NavLink
                to="/contacts"
                className={({ isActive }) =>
                  isActive ? "text-black" : "hover:text-black"
                }
              >
                Contacts
              </NavLink>
            </nav>
          </div>
          <button
            type="button"
            className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 cursor-pointer"
            onClick={() => logout()}
            disabled={isPending}
          >
            {isPending ? "Logging out..." : "Logout"}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;
