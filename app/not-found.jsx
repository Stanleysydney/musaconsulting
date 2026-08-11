import Link from "next/link";
import { buttonStyles } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="bg-[#f7f8fa] px-4 py-24 text-center">
      <p className="text-sm font-bold uppercase tracking-[0.14em] text-clinic-700">404</p>
      <h1 className="mt-3 text-4xl font-bold text-ink-950">Page not found</h1>
      <p className="mx-auto mt-4 max-w-xl text-ink-500">The page you requested is not available.</p>
      <Link href="/" className={buttonStyles({ size: "lg" }) + " mt-8"}>
        Return home
      </Link>
    </section>
  );
}
