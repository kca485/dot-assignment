import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { H1 } from "@/components/ui/typography";
import Link from "next/link";
import { AddTask } from "./AddTask";

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData?.user) {
    redirect("/login");
  }

  return (
    <div className="p-8 max-w-3xl m-auto">
      <H1 className="text-center">Task</H1>
      <p className="text-center">Hello, {authData.user.email}</p>
      <nav>
        <ul>
          <li>
            <Link href="/task" className="underline">
              All
            </Link>
          </li>
          <li>
            <Link href="/task/active" className="underline">
              Active
            </Link>
          </li>
          <li>
            <Link href="/task/completed" className="underline">
              Completed
            </Link>
          </li>
        </ul>
      </nav>
      <AddTask />
      {children}
    </div>
  );
}
