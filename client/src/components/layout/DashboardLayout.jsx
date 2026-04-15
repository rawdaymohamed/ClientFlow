const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b bg-white px-6 py-4 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-800">ClientFlow</h1>
          <p className="text-sm text-gray-500">Dashboard</p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;
