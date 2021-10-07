import React, { useEffect, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Task from "./task";
import styled from "styled-components";
import "./droppableComponent.css";

const Container = styled.div`
 margin: 8px;
 border: 1px solid black;
 border-border-radius: 2px;
 display-flex;
 justify-content: center;
 min-width: 400px;
 
`;

function getTask(value, key) {
  const taskArray = [];
  for (let i = 0; i < value; i++) {
    taskArray.push(<Task key={i} value={key} />);
  }
  // console.log("TaskArray: ", taskArray);
  return taskArray;
}

function DropableComponent({ id, taskKeys, setArray, updatedArray }) {
  const [draggableArray, setDraggableArray] = useState([]);

  // mouting , update, unmounting
  useEffect(() => {
    if (draggableArray.length) {
      console.log("in useEffect after draggablearray");
      setArray(draggableArray);
    }
  }, [draggableArray]);

  function getItemsForDraggable(taskKeys) {
    const map1 = new Map();
    taskKeys.map((item) => {
      if (!map1.has(item)) {
        map1.set(item, 1);
      } else {
        map1.set(item, map1.get(item) + 1);
      }
    });
    const draggableArr = [];
    let i = 0;
    // key = 1,2,3,4,5 value = 1-> count, 2-> count ,.....
    for (const [key, value] of map1) {
      console.log(key, value);
      draggableArr.push(
        <Draggable
          className={"draggableStyle"}
          key={key}
          draggableId={JSON.stringify(key)}
          index={i}>
          {(provided) => (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}>
              {getTask(value, key)}
            </div>
          )}
        </Draggable>
      );
      i++;
    }
    setDraggableArray(draggableArr);
    // console.log("Draggable arr: ", draggableArr);
    // return draggableArr;
  }

  useEffect(() => {
    getItemsForDraggable(taskKeys);
  }, []);

  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <Container {...provided.droppableProps} ref={provided.innerRef}>
          {/* {getItemsForDraggable(taskKeys)} */}
          {/* {draggableArray?.length ? draggableArray : null} */}
          {updatedArray?.length ? updatedArray : null}
          {/* {taskKeys?.map((item, index) => {
            return (
              <Draggable
                key={item}
                draggableId={JSON.stringify(item)}
                index={index}>
                {(provided) => (
                  <Task key={index} provided={provided} value={item} />
                )}
              </Draggable>
            );
          })} */}
          {provided.placeholder}
        </Container>
      )}
    </Droppable>
  );
}

export default DropableComponent;
