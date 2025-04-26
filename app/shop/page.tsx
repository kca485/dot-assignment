import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { H1 } from "@/components/ui/typography";
import { createClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { redirect } from "next/navigation";
import productImage from "@/public/placeholder.svg";
import Image from "next/image";

export default async function Page() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("dot_products").select();
  if (error) {
    redirect("/error");
  }

  return (
    <>
      <H1 className="text-center">Shop</H1>
      <div className="p-8 flex flex-wrap gap-2">
        {data.map((product) => (
          <Link key={product.id} href={`/shop/${product.id}`}>
            <Card className="flex-grow max-w-3xs min-w-[200px]">
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={productImage}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </CardContent>
              <CardFooter>
                <p className="font-bold">{formatPrice(product.price_cents)}</p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
