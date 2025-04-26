import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { H1 } from "@/components/ui/typography";

export default async function Page() {
  return (
    <>
      <H1 className="text-center">Shop</H1>
      <div className="p-8 flex gap-2">
        <Card className="max-w-3xs min-w-[200px]">
          <CardHeader>
            <Skeleton className="h-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="size-40" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-4 w-full" />
          </CardFooter>
        </Card>
        <Card className="max-w-3xs min-w-[200px]">
          <CardHeader>
            <Skeleton className="h-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="size-40" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-4 w-full" />
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
