import "./globals.css";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata = {
  metadataBase: new URL("https://musaconsulting.com"),
  title: {
    default: "MusaConsulting | Clinical Consultations and Care Coordination",
    template: "%s | MusaConsulting"
  },
  description:
    "Schedule clinical consultations, therapy follow-up, medication reviews, and care coordination through a secure patient intake.",
  openGraph: {
    title: "MusaConsulting",
    description: "Secure clinical consultations and care coordination.",
    url: "https://musaconsulting.com",
    siteName: "MusaConsulting",
    type: "website"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
