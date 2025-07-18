"use server";

export async function postAction(formData: FormData) {
  const task = formData.get("task") as string;
  const deadline = formData.get("date") as string;
  console.log(task, deadline);
}