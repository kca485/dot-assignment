import { Button } from "@/components/ui/button";
import { completeTask, deleteTask } from "./actions";

export interface Task {
  id: string;
  title: string;
  is_completed: boolean;
}
export interface Tasks {
  data: Task[];
}
interface TaskListProps extends Tasks {}

export async function TaskList({ data }: TaskListProps) {
  return (
    <ul className="space-y-4">
      {data?.map((task) => (
        <li key={task.id} className="flex gap-x-2 border-b">
          {!task.is_completed && (
            <form>
              <input type="hidden" name="id" value={task.id} />
              <Button variant="outline" formAction={completeTask}>
                Done
              </Button>
            </form>
          )}
          <span className="flex-grow flex items-center">{task.title}</span>
          <form>
            <input type="hidden" name="id" value={task.id} />
            <Button variant="destructive" formAction={deleteTask}>
              Delete
            </Button>
          </form>
        </li>
      ))}
    </ul>
  );
}
