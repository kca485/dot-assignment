import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Page() {
  return (
    <div className="p-8 grid md:grid-cols-2 gap-8">
      <div className="relative aspect-square overflow-hidden rounded-lg border">
        <Skeleton className="h-40" />
      </div>

      <div className="space-y-6">
        <Skeleton className="h-10" />

        <Card className="p-4">
          <Skeleton className="h-4" />
        </Card>

        <Skeleton className="h-8" />
      </div>
    </div>
  );
}
