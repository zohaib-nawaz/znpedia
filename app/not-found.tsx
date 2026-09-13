import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-bold">Page not found</h1>
      <p className="mt-2 text-muted-foreground">
        The course or chapter you requested does not exist.
      </p>
      <Link
        href="/courses"
        className="mt-6 text-sm font-medium text-accent underline underline-offset-2"
      >
        Back to courses
      </Link>
    </main>
  );
}
