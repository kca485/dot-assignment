import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { H1 } from "@/components/ui/typography";
import Link from "next/link";

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
    <>
      <H1>Task</H1>
      <p>Hello, {authData.user.email}</p>
      <nav>
        <ul>
          <li>
            <Link href="/task">All</Link>
          </li>
          <li>
            <Link href="/task/active">Active</Link>
          </li>
          <li>
            <Link href="/task/completed">Completed</Link>
          </li>
        </ul>
      </nav>
      {children}
    </>
  );
}
