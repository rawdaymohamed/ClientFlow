import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-gray-900">404</h1>
      <p className="mt-2 text-gray-500">Page not found</p>

      <Link
        to="/contacts"
        className="mt-4 rounded-lg bg-black px-4 py-2 text-sm text-white hover:bg-gray-800"
      >
        Go back to Contacts
      </Link>
    </div>
  );
};

export default NotFound;
