import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold">Welcome to Zealthy Onboarding</h1>
          <p className="text-lg mt-2">Your personalized onboarding experience starts here</p>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Navigate to Different Sections</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/onboarding.html">
              <a className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition">
                Onboarding
              </a>
            </Link>
            <Link href="/admin.html">
              <a className="bg-green-500 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition">
                Admin Panel
              </a>
            </Link>
            <Link href="/data.html">
              <a className="bg-yellow-500 text-white px-6 py-3 rounded-lg shadow hover:bg-yellow-700 transition">
                Data Table
              </a>
            </Link>
          </div>
        </div>
      </main>

    </div>
  );
}