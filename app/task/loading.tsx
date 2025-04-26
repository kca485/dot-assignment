import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-[36px]" />
      <Skeleton className="h-[36px]" />
    </div>
  );
}
