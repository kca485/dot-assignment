"use client";

import { useState } from "react";
import { MinusIcon, PlusIcon, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCart } from "../CartProvider";

interface ProductDetaiProps {
  product: {
    id: number;
    name: string;
    description?: string;
    price_cents: number;
    stock_quantity: number;
  };
}
export default function ProductDetail({ product }: ProductDetaiProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  function decreaseQuantity() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  function increaseQuantity() {
    setQuantity(quantity + 1);
  }

  function addToCart() {
    addItem({
      id: product.id,
      name: product.name,
      price_cents: product.price_cents,
      quantity,
    });

    toast.success(`${quantity} x ${product.name} added to your cart`, {
      description: "Your item has been added to the cart",
    });
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium mb-2">Quantity:</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={decreaseQuantity}
            disabled={quantity <= 1}
          >
            <MinusIcon className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center">{quantity}</span>
          <Button variant="outline" size="icon" onClick={increaseQuantity}>
            <PlusIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Button className="w-full" size="lg" onClick={addToCart}>
        <ShoppingCart className="mr-2 h-5 w-5" />
        Add to Cart
      </Button>
    </div>
  );
}
