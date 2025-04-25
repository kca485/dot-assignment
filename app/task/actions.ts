"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTask(formData: FormData) {
  const supabase = await createClient();
  const newTask = {
    title: formData.get("new-task"),
    is_completed: false,
  };

  console.log(newTask);
  const { error } = await supabase.from("dot_tasks").insert(newTask);

  if (error) {
    console.error(error);
    redirect("/error");
  }

  revalidatePath("/task");
}
