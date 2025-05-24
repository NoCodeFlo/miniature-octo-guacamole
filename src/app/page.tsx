export default function Home() {
  return (
    <main className="min-h-screen px-6 py-20 bg-white text-gray-900">
      <h1 className="text-4xl font-bold mb-4">Daily Recipes 🍳</h1>
      <p className="text-lg mb-6">
        Welcome to our personal cooking site! Every day, we add one favorite dish — simple, seasonal, and delicious 💛
      </p>
      <p className="text-md">
        Explore <a href="/recipes" className="text-blue-600 hover:underline">our recipe collection</a> or suggest something new!
      </p>
    </main>
  );
}