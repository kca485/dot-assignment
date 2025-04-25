import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { AddTask } from "../AddTask";
import { TaskList } from "../TaskList";

export default async function Page() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("dot_tasks")
    .select()
    .eq("is_completed", true);

  if (error) {
    redirect("/error");
  }

  return (
    <>
      <AddTask />
      <TaskList data={data} />
    </>
  );
}
