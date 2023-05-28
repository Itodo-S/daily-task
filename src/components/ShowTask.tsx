import { useState, useEffect } from "react";

import { Props, Task } from "./interface";

const ShowTask = ({ tasklist, setTasklist, setTask }: Props) => {
  const [checkedTasks, setCheckedTasks] = useState(() => {
    const storedCheckedTasks = localStorage.getItem("checkedTasks");
    return storedCheckedTasks ? JSON.parse(storedCheckedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("checkedTasks", JSON.stringify(checkedTasks));
  }, [checkedTasks]);

  const handleEdit = (id: number) => {
    const selectedTask = tasklist.find((todo) => todo.id === id);
    setTask(selectedTask || ({} as Task));
  };

  const handleDelete = (id: number) => {
    const updatedTaskList = tasklist.filter((todo) => todo.id !== id);
    setTasklist(updatedTaskList);

    // Clear the checkedTasks for the deleted task
    if (checkedTasks.includes(id)) {
      const updatedCheckedTasks = checkedTasks.filter(
        (taskId: number) => taskId !== id
      );
      setCheckedTasks(updatedCheckedTasks);
      localStorage.setItem("checkedTasks", JSON.stringify(updatedCheckedTasks));
    }

    // Clear all checkedTasks if the "Clear All" button is clicked
    if (updatedTaskList.length === 0) {
      setCheckedTasks([]);
      localStorage.removeItem("checkedTasks");
    }
  };

  const handleClearAll = () => {
    setTasklist([]);
    setCheckedTasks([]);
    localStorage.removeItem("checkedTasks");
  };

  const handleToggleChecked = (id: number) => {
    if (checkedTasks.includes(id)) {
      const updatedCheckedTasks = checkedTasks.filter(
        (taskId: number) => taskId !== id
      );
      setCheckedTasks(updatedCheckedTasks);
    } else {
      setCheckedTasks([...checkedTasks, id]);
    }
  };

  return (
    <section className="showTask">
      <p className="head">
        <span>
          <span className="title">Todo</span>
          <span className="count">{tasklist.length}</span>
        </span>
        <span className="clearAll" onClick={() => handleClearAll()}>
          Clear All
        </span>
      </p>

      <ul>
        {tasklist.map((todo: Task) => (
          <li key={todo.id}>
            <p>
              <span
                className={`name ${
                  checkedTasks.includes(todo.id) ? "checked" : ""
                }`}
              >
                {todo.name}
              </span>
              <span className="time">{todo.time}</span>
            </p>
            {checkedTasks.includes(todo.id) ? (
              <i
                onClick={() => handleToggleChecked(todo.id)}
                className="bi bi-clipboard-check"
              ></i>
            ) : (
              <i
                onClick={() => handleToggleChecked(todo.id)}
                className="bi bi-clipboard"
              ></i>
            )}
            <i
              onClick={() => handleEdit(todo.id)}
              className="bi bi-pencil-square"
            ></i>
            <i
              onClick={() => handleDelete(todo.id)}
              className="bi bi-trash"
            ></i>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ShowTask;
