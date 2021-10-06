import "@atlaskit/css-reset";
import { DragDropContext } from "react-beautiful-dnd";
import DropableComponent from "./components/dropableComponent";
import { useState } from "react";

const getTaskKeys = (numOfKeys) => {
  let keyArr = [];
  for (let i = 1; i <= numOfKeys; i++) {
    keyArr.push(i);
  }
  return keyArr;
};

function App() {
  const [taskKeys, setTaskKeys] = useState(getTaskKeys(5));
  const [taskKeys2, setTaskKeys2] = useState([]);

  const onDragEnd = (result) => {
    if (result.destination !== null) {
      // 2 diff droppables
      if (result.source.droppableId !== result.destination.droppableId) {
        const items = Array.from(taskKeys);
        const items2 = Array.from(taskKeys2);
        if (result.source.droppableId === "one") {
          const [reorderItem] = items.splice(result.source.index, 1);
          items2.splice(result.destination.index, 0, reorderItem);
        } else if (result.source.droppableId === "two") {
          const [reorderedItem] = items2.splice(result.source.index, 1);
          items.splice(result.destination.index, 0, reorderedItem);
        }
        setTaskKeys2(items2);
        setTaskKeys(items);
      }
      // within same droppable
      else {
        if (result.destination.droppableId === "one") {
          const items = Array.from(taskKeys);
          const [reorderdItem] = items.splice(result.source.index, 1);
          items.splice(result.destination.index, 0, reorderdItem);
          setTaskKeys(items);
        } else {
          const items2 = Array.from(taskKeys2);
          const [reorderedItem] = items2.splice(result.source.index, 1);
          items2.splice(result.destination.index, 0, reorderedItem);
          setTaskKeys2(items2);
        }
      }
    } else {
      return;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <h2 style={{ textAlign: "center" }}>React beautiful DND</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <DropableComponent id={"one"} taskKeys={taskKeys} />
        <DropableComponent id={"two"} taskKeys={taskKeys2} />
      </div>
    </DragDropContext>
  );
}

export default App;
