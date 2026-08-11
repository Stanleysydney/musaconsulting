"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./Button";

export function LogoutButton() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  async function handleLogout() {
    setIsPending(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <Button type="button" variant="outline" onClick={handleLogout} disabled={isPending}>
      <LogOut aria-hidden="true" size={17} />
      {isPending ? "Signing out" : "Sign out"}
    </Button>
  );
}
