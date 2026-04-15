const FormAlert = ({ message }) => {
  if (!message) return null;

  return (
    <p className="mb-4 rounded-md bg-red-100 px-3 py-2 text-sm text-red-700">
      {message}
    </p>
  );
};

export default FormAlert;
