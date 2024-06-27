import Image from "next/image";

const blogPosts = [
  {
    title: "Post One",
    description: "This is a description for the first blog post.",
    date: "June 25, 2024",
    author: "Author One",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    title: "Post Two",
    description: "This is a description for the second blog post.",
    date: "June 26, 2024",
    author: "Author Two",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    title: "Post Three",
    description: "This is a description for the third blog post.",
    date: "June 27, 2024",
    author: "Author Three",
    imageUrl: "https://via.placeholder.com/150",
  },
];

const BlogPage = () => {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
        Blog
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <Image
              src={post.imageUrl}
              alt={post.title}
              height={1000}
              width={1000}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-4">{post.description}</p>
              <div className="text-gray-500 text-sm mb-4">
                <span>{post.date}</span> | <span>{post.author}</span>
              </div>
              <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
