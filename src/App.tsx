import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import AddTask from "./components/AddTask";
import ShowTask from "./components/ShowTask";
import { Task } from "./components/interface";

function App() {
  const storedTaskList = localStorage.getItem("tasklist");
  const initialTaskList = storedTaskList ? JSON.parse(storedTaskList) : [];
  const [tasklist, setTasklist] = useState<Array<Task>>(initialTaskList);
  const [task, setTask] = useState<Task>({} as Task);

  useEffect(() => {
    localStorage.setItem("tasklist", JSON.stringify(tasklist));
  }, [tasklist]);
  return (
    <div className="App">
      <div className="container">
        <Header />
        <AddTask
          task={task}
          setTask={setTask}
          tasklist={tasklist}
          setTasklist={setTasklist}
        />
        <ShowTask
          task={task}
          setTask={setTask}
          tasklist={tasklist}
          setTasklist={setTasklist}
        />
      </div>
    </div>
  );
}

export default App;
