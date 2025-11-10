import type { ReactNode } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

export default function RootLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode; // 👈 добавляем modal сюда
}) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          {children}
          {modal} {/* 👈 теперь модалки будут рендериться */}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
