import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <div className="text-lg font-bold">Zealthy Onboarding</div>
        <div className="flex space-x-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/onboarding" className="hover:underline">
            Onboarding
          </Link>
          <Link href="/admin" className="hover:underline">
            Admin
          </Link>
          <Link href="/data" className="hover:underline">
            Data Table
          </Link>
        </div>
      </div>
    </nav>
  );
}