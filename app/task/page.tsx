import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { completeTask, createTask, deleteTask } from "./actions";
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
      <ul>
        {data?.map((task) => (
          <li key={task.id} className="flex">
            {!task.is_completed && (
              <form>
                <input type="hidden" name="id" value={task.id} />
                <Button formAction={completeTask}>Done</Button>
              </form>
            )}
            <span className="flex-grow">{task.title}</span>
            <form>
              <input type="hidden" name="id" value={task.id} />
              <Button formAction={deleteTask}>Delete</Button>
            </form>
          </li>
        ))}
      </ul>
    </>
  );
}
