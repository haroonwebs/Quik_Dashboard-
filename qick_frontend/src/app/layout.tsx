import Navbar from "@/components/Navbar";
import "@/app/globals.css";
export const metadata = {
  title: "Qick Dahsboard",
  description: "Your Site Description",
  icons: {
    icon: [
      { url: "/images/haroon.png" },
      { url: "/icon.png", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
