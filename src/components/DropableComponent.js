import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Container = styled.div`
 margin: 8px;
 border: 1px solid lightgrey;
 border-border-radius: 2px;
 display-flex;
 justify-content: center;
 margin-bottom: 20px;
 min-width: 400px;
 background-color: skyblue;
 
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
  // display: flex;
`;

function DropableComponent({ id, taskKeys }) {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <Container {...provided.droppableProps} ref={provided.innerRef}>
          {taskKeys.map((item, index) => {
            // console.log(item, index);
            return (
              <Draggable
                key={item}
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
  );
}

export default DropableComponent;
