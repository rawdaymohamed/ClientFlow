const LoadingScreen = ({ message = "Loading..." }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <p className="text-sm text-gray-600">{message}</p>
    </div>
  );
};

export default LoadingScreen;
