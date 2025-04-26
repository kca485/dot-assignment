"use client";

import Image from "next/image";
import Link from "next/link";
import { MinusIcon, PlusIcon, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";
import productImage from "@/public/placeholder.svg";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useCart } from "./CartProvider";
import { formatPrice } from "@/lib/utils";

type CartDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, clearCart, subtotal_cents } =
    useCart();
  const isCartEmpty = Boolean(!items.length);

  const handleCheckout = () => {
    toast.success("Order placed successfully!", {
      description: "Thank you for your purchase",
    });
    clearCart();
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-md">
          <DrawerHeader>
            <DrawerTitle className="text-xl">Your Cart</DrawerTitle>
            <DrawerDescription>
              {isCartEmpty
                ? "Your cart is empty"
                : `You have ${items.length} item${items.length !== 1 ? "s" : ""} in your cart`}
            </DrawerDescription>
          </DrawerHeader>

          <div className="px-4 overflow-y-auto max-h-[60vh]">
            {isCartEmpty ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">
                  Your cart is currently empty
                </p>
                <DrawerClose asChild>
                  <Button>Continue Shopping</Button>
                </DrawerClose>
              </div>
            ) : (
              <div className="space-y-4 py-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b">
                    <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={productImage}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between">
                        <DrawerClose asChild>
                          <Link
                            href={`/product/${item.id}`}
                            className="font-medium hover:underline"
                          >
                            {item.name}
                          </Link>
                        </DrawerClose>
                        <p className="font-medium">
                          {formatPrice(item.price_cents)}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <MinusIcon className="h-3 w-3" />
                          </Button>
                          <span className="w-6 text-center text-sm">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <PlusIcon className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive/80 h-7 px-2"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {!isCartEmpty && (
            <div className="px-4 pb-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Subtotal</span>
                  <span>{formatPrice(subtotal_cents)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Shipping</span>
                  <span>Free</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{formatPrice(subtotal_cents)}</span>
                </div>
              </div>

              <DrawerFooter className="px-0 pt-4">
                <Button className="w-full" size="lg" onClick={handleCheckout}>
                  Checkout
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline">Continue Shopping</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
