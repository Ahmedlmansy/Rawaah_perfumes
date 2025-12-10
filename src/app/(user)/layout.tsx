import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Header />
        {children}
        <Toaster richColors position="top-right" />

        <Footer />
      </body>
    </html>
  );
}
