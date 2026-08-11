import { apiJson } from "@/lib/security";
import { hasDatabaseConfig } from "@/lib/db";
import { hasEmailConfig } from "@/lib/email";

export async function GET() {
  return apiJson({
    ok: true,
    service: "musaconsulting",
    checks: {
      databaseConfigured: hasDatabaseConfig(),
      emailConfigured: hasEmailConfig()
    }
  });
}
