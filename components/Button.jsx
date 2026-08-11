import { twMerge } from "tailwind-merge";

export function buttonStyles({ variant = "primary", size = "md" } = {}) {
  const base =
    "focus-ring inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition disabled:pointer-events-none disabled:opacity-55";

  const variants = {
    primary: "bg-clinic-600 text-white shadow-soft hover:bg-clinic-700",
    secondary: "bg-ink-950 text-white hover:bg-ink-900",
    outline: "border border-ink-950/15 bg-white text-ink-900 hover:border-clinic-600 hover:text-clinic-700",
    ghost: "text-ink-700 hover:bg-ink-950/5"
  };

  const sizes = {
    sm: "min-h-10 px-4 text-sm",
    md: "min-h-11 px-5 text-sm",
    lg: "min-h-12 px-6 text-base"
  };

  return twMerge(base, variants[variant], sizes[size]);
}

export function Button({ className, variant = "primary", size = "md", ...props }) {
  return <button className={twMerge(buttonStyles({ variant, size }), className)} {...props} />;
}
