import Link from "next/link";
import { ArrowRightIcon, SearchIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md text-center">
        <p className="bg-gradient-to-br from-primary to-primary-dark bg-clip-text text-8xl font-black text-transparent">
          404
        </p>
        <h1 className="mt-4 text-2xl font-black tracking-tight text-gray-900">
          Page Not Found
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-500">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved. Let&apos;s
          get you back on the road.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary/25 transition hover:bg-primary-dark"
          >
            <ArrowRightIcon className="h-4 w-4" />
            Back To Home
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-bold text-gray-700 transition hover:border-gray-900 hover:text-gray-900"
          >
            <SearchIcon className="h-4 w-4" />
            Browse Parts
          </Link>
        </div>
      </div>
    </div>
  );
}
