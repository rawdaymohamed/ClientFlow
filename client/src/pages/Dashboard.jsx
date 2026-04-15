import DashboardLayout from "../components/layout/DashboardLayout.jsx";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
        <p className="mt-2 text-sm text-gray-500">Welcome to your dashboard.</p>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
