const pricingPlans = [
  {
    title: "Basic Plan",
    price: "$9.99/month",
    features: ["Feature A", "Feature B", "Feature C"],
  },
  {
    title: "Pro Plan",
    price: "$19.99/month",
    features: ["Feature A", "Feature B", "Feature C", "Feature D"],
  },
  {
    title: "Enterprise Plan",
    price: "$29.99/month",
    features: ["Feature A", "Feature B", "Feature C", "Feature D", "Feature E"],
  },
];

const PricingPage = () => {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
        Pricing Plans
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center"
          >
            <h3 className="text-xl font-semibold mb-4">{plan.title}</h3>
            <p className="text-4xl font-bold mb-6">{plan.price}</p>
            <ul className="text-gray-600 mb-6">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="mb-2">
                  {feature}
                </li>
              ))}
            </ul>
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
