const MetricCard = ({ title, value, subtitle }) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <h3 className="mt-2 text-3xl font-semibold text-gray-900">{value}</h3>
      {subtitle ? (
        <p className="mt-2 text-sm leading-6 text-gray-500">{subtitle}</p>
      ) : null}
    </div>
  );
};

export default MetricCard;
