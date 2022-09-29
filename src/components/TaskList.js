import TaskForm from "./TaskForm";
import Task from "./Task";
import { useSelector } from "react-redux";

const TaskList = () => {
  const tasklist = useSelector((state) => state.tasks.tasklist);

  return (
    <div>
      <TaskForm />
      <div className="cards-container">
        <div className="cards ">
          {tasklist
            .filter((task) => task.active)
            .map((task) => {
              return <Task key={task.id} {...task} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
