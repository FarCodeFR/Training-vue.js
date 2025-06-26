export interface Task {
  id: number;
  title: string;
  done: boolean;
}

export interface TaskItemProps extends Task {
  deleteTask: (id: number) => void;
  editTask: (id: number, newTitle: string) => void;
}
