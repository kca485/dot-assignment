"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCart } from "./CartProvider";
import { ShoppingCart } from "lucide-react";
import CartDrawer from "./CartDrawer";
import { Badge } from "@/components/ui/badge";

export function Cart() {
  const { itemCount } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <>
      <Button variant="outline" size="icon" onClick={() => setCartOpen(true)}>
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
            {itemCount}
          </Badge>
        )}
      </Button>
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </>
  );
}
