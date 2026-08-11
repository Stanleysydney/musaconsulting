import { getSessionUser } from "@/lib/auth";
import { apiJson } from "@/lib/security";

export async function GET() {
  const user = await getSessionUser();

  if (!user) {
    return apiJson({ ok: true, user: null });
  }

  return apiJson({
    ok: true,
    user: {
      name: user.name,
      email: user.email,
      role: user.role || "patient"
    }
  });
}
