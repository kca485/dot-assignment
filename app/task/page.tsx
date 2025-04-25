import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createTask } from "./actions";
import { H1, Ul } from "@/components/ui/typography";

export default async function Page() {
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData?.user) {
    redirect("/login");
  }

  const { data } = await supabase.from("dot_tasks").select();

  return (
    <>
      <H1>Task</H1>
      <p>Hello, {authData.user.email}</p>
      <form>
        <Label htmlFor="new-task">Add New Task:</Label>
        <Input id="new-task" name="new-task" required />
        <Button formAction={createTask}>Submit</Button>
      </form>
      <Ul>{data?.map((task) => <li key={task.id}>{task.title}</li>)}</Ul>
    </>
  );
}
