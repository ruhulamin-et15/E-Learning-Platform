const DocumentationPage = () => {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
        Documentation
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <nav className="space-y-4">
            <a
              href="#section1"
              className="block text-lg font-medium text-gray-700 hover:text-gray-900"
            >
              Introduction
            </a>
            <a
              href="#section2"
              className="block text-lg font-medium text-gray-700 hover:text-gray-900"
            >
              Getting Started
            </a>
            <a
              href="#section3"
              className="block text-lg font-medium text-gray-700 hover:text-gray-900"
            >
              Installation
            </a>
            <a
              href="#section4"
              className="block text-lg font-medium text-gray-700 hover:text-gray-900"
            >
              Usage
            </a>
            <a
              href="#section5"
              className="block text-lg font-medium text-gray-700 hover:text-gray-900"
            >
              API Reference
            </a>
          </nav>
        </aside>
        <main className="lg:col-span-3 space-y-12">
          <section id="section1">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Introduction
            </h2>
            <p className="text-gray-700">
              Welcome to the documentation. This section provides an overview of
              the project and its goals.
            </p>
          </section>
          <section id="section2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Getting Started
            </h2>
            <p className="text-gray-700">
              This section covers the basics to get you started with the
              project, including prerequisites and setup instructions.
            </p>
          </section>
          <section id="section3">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Installation
            </h2>
            <p className="text-gray-700">
              Follow these steps to install the project. Ensure you have the
              necessary tools and dependencies.
            </p>
          </section>
          <section id="section4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Usage</h2>
            <p className="text-gray-700">
              This section provides examples and explanations on how to use the
              project effectively.
            </p>
          </section>
          <section id="section5">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              API Reference
            </h2>
            <p className="text-gray-700">
              Detailed information about the projects API, including endpoints,
              parameters, and examples.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default DocumentationPage;
