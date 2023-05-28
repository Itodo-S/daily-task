import React from "react";
import { Props } from "./interface";

const AddTask = ({ tasklist, setTasklist, task, setTask }: Props) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (task.id) {
      const date = new Date();
      const updatedTaskList = tasklist.map((todo) =>
        todo.id === task.id
          ? {
              id: task.id,
              name: task.name,
              time: `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`,
            }
          : todo
      );

      setTasklist(updatedTaskList);
      setTask({ id: 0, name: "", time: "" });
    } else {
      const date = new Date();

      const newTask = {
        id: date.getTime(),
        name: (e.target as HTMLFormElement).task.value,
        time: `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`,
      };

      setTasklist([...tasklist, newTask]);

      (e.target as HTMLFormElement).task.value = "";
      setTask({ id: 0, name: "", time: "" });
    }
  };

  return (
    <section className="addTask">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="task"
          value={task.name || ""}
          autoComplete="off"
          placeholder="Add task"
          onChange={(e) => setTask({ ...task, name: e.target.value })}
        />
        <button type="submit">{task.id ? "Update" : "Add"}</button>
      </form>
    </section>
  );
};

export default AddTask;
