import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { TaskList } from "../TaskList";

export default async function Page() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("dot_tasks")
    .select()
    .eq("is_completed", false);

  if (error) {
    redirect("/error");
  }

  return (
      <TaskList data={data} />
  );
}
