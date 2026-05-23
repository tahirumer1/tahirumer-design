import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AppShell from "@/components/AppShell";

export const metadata = {
  title: "Tahir Umer — Product Designer",
  description: "UI/UX Designer with 10+ years of experience. Helping businesses turn complex ideas into high-performing digital experiences.",
  metadataBase: new URL("https://tahirumer.site"),
  openGraph: {
    title: "Tahir Umer — Product Designer",
    description: "UI/UX Designer with 10+ years of experience.",
    url: "https://tahirumer.site",
    siteName: "Tahir Umer",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppShell>
          <Nav />
          {children}
          <Footer />
        </AppShell>
      </body>
    </html>
  );
}
