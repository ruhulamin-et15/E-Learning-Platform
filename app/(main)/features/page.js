const features = [
  {
    title: "Feature One",
    description:
      "This is a description for feature one. It has great functionality.",
    icon: "🔥",
  },
  {
    title: "Feature Two",
    description: "This is a description for feature two. It is very useful.",
    icon: "✨",
  },
  {
    title: "Feature Three",
    description:
      "This is a description for feature three. It is highly recommended.",
    icon: "🚀",
  },
  // Add more features as needed
];

const FeaturesPage = () => {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
        Our Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-center">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesPage;
