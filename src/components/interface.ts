import { Dispatch, SetStateAction } from "react";

export interface Task {
  id: number;
  name: string;
  time: string;
}

export interface Props {
  task: Task;
  setTask: Dispatch<SetStateAction<Task>>;
  tasklist: Array<Task>;
  setTasklist: React.Dispatch<React.SetStateAction<Array<Task>>>;
}
