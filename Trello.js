import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./Trello.css";

const ItemType = "TASK";

const TaskCard = ({ task, index, moveTask, columnIndex }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { id: task.id, index, columnIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className="task-card"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <strong>{task.title}</strong>
      <p>{task.description}</p>
    </div>
  );
};

const Column = ({ title, tasks, moveTask, columnIndex, openPopup }) => {
  const [, drop] = useDrop({
    accept: ItemType,
    drop: (item) => moveTask(item.id, item.columnIndex, columnIndex),
  });

  return (
    <div ref={drop} className="column">
      <h2>
        {title} <button onClick={() => openPopup(columnIndex)}>+</button>
      </h2>
      {tasks.map((task, index) => (
        <TaskCard
          key={task.id}
          task={task}
          index={index}
          moveTask={moveTask}
          columnIndex={columnIndex}
        />
      ))}
    </div>
  );
};

const Trello = () => {
  const [boards, setBoards] = useState([{ name: "Default Board", tasks: [] }]);
  const [activeBoardIndex, setActiveBoardIndex] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: 0,
  });
  const [newBoardName, setNewBoardName] = useState("");
  const columns = ["Pending", "In Progress", "Done"];

  const moveTask = (taskId, fromColumn, toColumn) => {
    setBoards((prevBoards) => {
      const updatedBoards = [...prevBoards];
      const boardTasks = updatedBoards[activeBoardIndex].tasks;
      const movedTask = boardTasks.find((task) => task.id === taskId);
      if (!movedTask) return updatedBoards;
      updatedBoards[activeBoardIndex].tasks = boardTasks.filter(
        (task) => task.id !== taskId
      );
      movedTask.status = toColumn;
      updatedBoards[activeBoardIndex].tasks.push(movedTask);
      return updatedBoards;
    });
  };

  const openPopup = (columnIndex) => {
    setNewTask({ title: "", description: "", status: columnIndex });
    setIsPopupOpen(true);
  };

  const closePopup = () => setIsPopupOpen(false);

  const addTask = () => {
    if (newTask.title.trim() && newTask.description.trim()) {
      setBoards((prevBoards) => {
        const updatedBoards = [...prevBoards];
        updatedBoards[activeBoardIndex].tasks = [
          ...updatedBoards[activeBoardIndex].tasks,
          { ...newTask, id: Date.now() },
        ];
        return updatedBoards;
      });
      closePopup();
    }
  };

  const addBoard = () => {
    if (newBoardName.trim()) {
      setBoards([...boards, { name: newBoardName, tasks: [] }]);
      setNewBoardName("");
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="header">
        <h1>Project Management Board</h1>
      </div>

      <div className="board-selection">
        {boards.map((board, index) => (
          <button
            key={index}
            className={index === activeBoardIndex ? "active" : ""}
            onClick={() => setActiveBoardIndex(index)}
          >
            {board.name}
          </button>
        ))}
        <input
          type="text"
          placeholder="New Board Name"
          value={newBoardName}
          onChange={(e) => setNewBoardName(e.target.value)}
        />
        <button onClick={addBoard}>Add Board</button>
      </div>

      <div className="board">
        {columns.map((column, index) => (
          <Column
            key={index}
            title={column}
            tasks={boards[activeBoardIndex].tasks.filter(
              (task) => task.status === index
            )}
            moveTask={moveTask}
            columnIndex={index}
            openPopup={openPopup}
          />
        ))}
      </div>

      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h3>Add New Task</h3>
            <input
              type="text"
              placeholder="Title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
            />
            <textarea
              placeholder="Description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
            ></textarea>
            <div className="popup-buttons">
              <button onClick={addTask}>Add</button>
              <button onClick={closePopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </DndProvider>
  );
};

export default Trello;
