export type Task = {
  id: string;
  deadline?: string | Date | null;
  taskName: string;
  createdAt: string;
  completed: boolean;
};
