import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="heading-display text-cabernet">Page Not Found</h1>
      <p className="mt-4 text-espresso/90">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-lg bg-cabernet px-6 py-3 font-medium text-white hover:bg-cabernet/90"
      >
        Back to Home
      </Link>
    </div>
  );
}
