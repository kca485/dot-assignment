import { Cart } from "./Cart";
import { CartProvider } from "./CartProvider";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartProvider>
      <div className="flex justify-end">
        <Cart />
      </div>
      {children}
    </CartProvider>
  );
}
