import { Card } from "@/components/ui/card";
import { H1 } from "@/components/ui/typography";
import { createClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { redirect } from "next/navigation";
import ProductDetail from "./ProductDetail";
import productImage from "@/public/placeholder.svg";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("dot_products")
    .select()
    .eq("id", id);
  if (!data || error) {
    redirect("/error");
  }
  const product = data[0];

  return (
    <div className="p-8 grid md:grid-cols-2 gap-8">
      <div className="relative aspect-square overflow-hidden rounded-lg border">
        <Image
          src={productImage}
          alt={product.name}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="space-y-6">
        <H1>{product.name}</H1>

        <Card className="p-4">
          <p className="text-gray-600">{product.description}</p>
        </Card>

        <p className="text-2xl font-semibold mt-2">
          {formatPrice(product.price_cents)}
        </p>

        <ProductDetail product={product} />
      </div>
    </div>
  );
}
