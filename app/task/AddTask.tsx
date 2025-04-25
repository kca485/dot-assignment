import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createTask } from "./actions";

export async function AddTask() {
  return (
    <form>
      <Label htmlFor="new-task">Add New Task:</Label>
      <Input id="new-task" name="new-task" required />
      <Button formAction={createTask}>Submit</Button>
    </form>
  );
}
