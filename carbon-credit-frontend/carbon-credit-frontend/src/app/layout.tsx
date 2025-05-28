// src/app/layout.tsx
import "../styles/globals.css";

import { WalletProvider } from "../components/WalletContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WalletProvider>
          {children}
        </WalletProvider>
      </body>
    </html>
  );
}
