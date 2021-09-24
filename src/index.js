import React from "react";
import ReactDOM from "react-dom";
import "@atlaskit/css-reset";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Container = styled.div`
 margin: 8px;
 border: 1px solid lightgrey;
 border-border-radius: 2px;
 display-flex;
 justify-content: center;
 min-width: 400px;
 
`;

const Task = styled.div`
  border: 1px solid lighgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: limegreen;
  margin-top: 10px;
  text-align: center;
  color: white;
`;

const getColumnKeys = (numOfKeys) => {
  const keyArr = [];
  for (let i = 1; i <= numOfKeys; i++) {
    keyArr.push(i);
  }
  return keyArr;
};

const getTaskKeys = (numOfKeys) => {
  let keyArr = [];
  for (let i = 1; i <= numOfKeys; i++) {
    keyArr.push(i);
  }
  return keyArr;
};

function App() {
  const columnKeys = getColumnKeys(1);
  const [taskKeys, setTaskKeys] = React.useState(getTaskKeys(5));
  const [taskKeys2, setTaskKeys2] = React.useState([]);

  const onDragEnd = (result) => {
    debugger;
    console.log("result", result);
    if (result.destination !== null) {
      // if (result.destination.droppableId !== null) {
      if (result.source.droppableId !== result.destination.droppableId) {
        // if (result.destination.droppableId !== null) {
        if (result.source.droppableId === "one") {
          const items = Array.from(taskKeys);
          const items2 = Array.from(taskKeys2);
          const [reorderItem] = items.splice(result.source.index, 1);
          // items.splice(result.source.index, 1);
          items2.splice(result.destination.index, 0, reorderItem);
          setTaskKeys2(items2);
          setTaskKeys(items);
        } else if (result.source.droppableId === "two") {
          const items = Array.from(taskKeys);
          const items2 = Array.from(taskKeys2);
          const [reorderedItem] = items2.splice(result.source.index, 1);
          // items2.splice(result.source.index, 1);
          items.splice(result.destination.index, 0, reorderedItem);
          setTaskKeys(items);
          setTaskKeys2(items2);
        }
      }
      // }
      // }
      else {
        console.log("source ", result.source);
        console.log("destination", result.destination);
        if (result.destination.droppableId === "one") {
          // if (result.destination !== null) {
          // console.log("debugger", result);

          const items = Array.from(taskKeys);

          const [reorderdItem] = items.splice(result.source.index, 1); // 1 - index 0 3 - index 1 // we pick 3
          // console.log("hello", reorderdItem); // 1 is at 0 index
          items.splice(result.destination.index, 0, reorderdItem); // [1 == 0th index , recorderItem]
          // console.log(items);
          setTaskKeys(items);
          // }
        } else {
          // if (result.destination !== null) {
          // console.log("debugger", result);
          const items2 = Array.from(taskKeys2);
          const [reorderedItem] = items2.splice(result.source.index, 1);
          items2.splice(result.destination.index, 0, reorderedItem);
          setTaskKeys2(items2);
          // }
          //  else {
          //   const items2 = Array.from(taskKeys2);
          //   const [recorderd] = items2.splice(result.source.index, 1);
          //   items2.splice(result.source.index, 0, recorderd);
          //   setTaskKeys2(items2);
          // }
        }
      }
    } else {
      return;
    }
    // console.log("result", result);

    // const items = Array.from(taskKeys);

    // const [reorderdItem] = items.splice(result.source.index, 1);
    // console.log("hello", reorderdItem);
    // items.splice(result.destination.index, 0, reorderdItem);
    // console.log(items);
    // setTaskKeys(items);
    // let arr = [10, 20, 30, 40, 50];
    // const ans = arr.splice(0, 1, 89);
    // console.log("ans", ans, arr);
  };

  // console.log(columnKeys, taskKeys);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <h2 style={{ textAlign: "center" }}>Hello React</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Droppable droppableId='one'>
          {(provided) => (
            <Container {...provided.droppableProps} ref={provided.innerRef}>
              {taskKeys.map((item, index) => {
                // console.log(item, index);
                return (
                  <Draggable
                    key={index}
                    draggableId={JSON.stringify(item)}
                    index={index}
                  >
                    {(provided) => (
                      <Task
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <p>{item}</p>
                      </Task>
                    )}
                  </Draggable>
                );
              })}

              {provided.placeholder}
            </Container>
          )}
        </Droppable>
        <Droppable droppableId='two'>
          {(provided) => (
            <Container {...provided.droppableProps} ref={provided.innerRef}>
              {taskKeys2.map((item, index) => {
                // console.log(item, index);
                return (
                  <Draggable
                    key={index}
                    draggableId={JSON.stringify(item)}
                    index={index}
                  >
                    {(provided) => (
                      <Task
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <p>{item}</p>
                      </Task>
                    )}
                  </Draggable>
                );
              })}

              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

// import React from "react";
// import ReactDOM from "react-dom";
// import "@atlaskit/css-reset";
// import { DragDropContext } from "react-beautiful-dnd";
// import styled from "styled-components";
// import DropableComponent from "./components/DropableComponent";

// // const Container = styled.div`
// //  margin: 8px;
// //  border: 1px solid lightgrey;
// //  border-border-radius: 2px;
// //  display-flex;
// //  justify-content: center;
// //  margin-bottom: 20px;
// //  min-width: 400px;
// //  background-color: skyblue;

// // `;
// const Wrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   flex-direction: column;
//   align-items: center;
// `;

// // const Task = styled.div`
// //   border: 1px solid lighgrey;
// //   border-radius: 2px;
// //   padding: 8px;
// //   margin-bottom: 8px;
// //   background-color: limegreen;
// //   margin-top: 10px;
// //   text-align: center;
// //   color: white;
// //   // display: flex;
// // `;

// // const getColumnKeys = (numOfKeys) => {
// //   const keyArr = [];
// //   for (let i = 1; i <= numOfKeys; i++) {
// //     keyArr.push(i);
// //   }
// //   return keyArr;
// // };

// const getTaskKeys = (startIndex, endIndex) => {
//   let keyArr = [];
//   for (let i = startIndex; i <= endIndex; i++) {
//     keyArr.push(i);
//   }
//   return keyArr;
// };

// const arr = ["one", "two"];

// function App() {
//   // const columnKeys = getColumnKeys(1);
//   const [taskKeys1, setTaskKeys1] = React.useState(getTaskKeys(1, 5));
//   const [taskKeys2, setTaskKeys2] = React.useState(getTaskKeys(6, 10));
//   const [taskKeys, setTaskKeys] = React.useState([taskKeys1, taskKeys2]);
//   // console.log("taskKeys", taskKeys);

//   const onDragEnd = (result) => {
//     console.log("result", result);

//     if (result.destination !== null) {
//       console.log("result", result);

//       const items = Array.from(taskKeys1);

//       const [reorderdItem] = items.splice(result.source.index, 1);
//       // console.log("hello", reorderdItem);
//       items.splice(result.destination.index, 0, reorderdItem);
//       // console.log(items);
//       setTaskKeys1(items);
//     } else {
//       const items = Array.from(taskKeys);

//       items.splice(result.source.index, 1);
//       setTaskKeys1(items);
//     }

//     // console.log("result", result);

//     // const items = Array.from(taskKeys);

//     // const [reorderdItem] = items.splice(result.source.index, 1);
//     // console.log("hello", reorderdItem);
//     // items.splice(result.destination.index, 0, reorderdItem);
//     // console.log(items);
//     // setTaskKeys(items);
//     // let arr = [10, 20, 30, 40, 50];
//     // const ans = arr.splice(0, 1, 89);
//     // console.log("ans", ans, arr);
//   };

//   // console.log(columnKeys, taskKeys);
//   // let i = 0;
//   // setTaskKeys(getTaskKeys(i + 5));
//   // i += taskKeys.length;

//   return (
//     <Wrapper>
//       <DragDropContext onDragEnd={onDragEnd}>
//         <h2 style={{ textAlign: "center" }}>React-beautiful-dnd</h2>
//         <div style={{ display: "flex", flexDirection: "row" }}>
//           {/* {arr.map((uniqueId, index) => {
//             const taskKeys = index === 0 ? taskKeys1 : taskKeys2;
//             return <DropableComponent id={uniqueId} taskKeys={taskKeys} />;
//           })} */}
//           <DropableComponent id='one' taskKeys={taskKeys1} />
//           <DropableComponent id='two' taskKeys={taskKeys2} />
//         </div>
//       </DragDropContext>
//     </Wrapper>
//   );
// }

// ReactDOM.render(<App />, document.getElementById("root"));
