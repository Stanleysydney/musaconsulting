import { ShieldCheck } from "lucide-react";
import { AuthForm } from "@/components/AuthForm";

export const metadata = {
  title: "Patient Portal",
  description: "Secure sign in for the MusaConsulting patient portal."
};

export default function LoginPage() {
  return (
    <section className="bg-[#f7f8fa] py-12 sm:py-16">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div className="self-center">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-clinic-700">Portal</p>
          <h1 className="mt-3 text-3xl font-bold tracking-normal text-ink-950 sm:text-4xl">Private access for patients.</h1>
          <p className="mt-5 text-base leading-7 text-ink-500">
            Sign in to review appointment requests and keep care coordination in one place.
          </p>
          <div className="mt-8 grid gap-3">
            {[
              "Passwords are protected before storage.",
              "Sessions expire automatically after a short window.",
              "Account responses avoid exposing private account details.",
              "Dashboard information is shown only after sign in."
            ].map((item) => (
              <div key={item} className="flex gap-3 rounded-lg border border-ink-950/10 bg-white p-4 text-sm font-semibold text-ink-700">
                <ShieldCheck aria-hidden="true" className="mt-0.5 shrink-0 text-clinic-700" size={18} />
                {item}
              </div>
            ))}
          </div>
        </div>

        <AuthForm />
      </div>
    </section>
  );
}
