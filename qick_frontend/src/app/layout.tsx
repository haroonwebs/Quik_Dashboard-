import Navbar from "@/components/Navbar";
import "@/app/globals.css";
import OrdersContextProvider from "@/contexts/OrdersContextProvider";
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
        <OrdersContextProvider>
          <Navbar />
          {children}
        </OrdersContextProvider>
      </body>
    </html>
  );
}
