import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Task from "./task";
import styled from "styled-components";

const Container = styled.div`
 margin: 8px;
 border: 1px solid black;
 border-border-radius: 2px;
 display-flex;
 justify-content: center;
 min-width: 400px;
 
`;

function DropableComponent({ id, taskKeys }) {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <Container {...provided.droppableProps} ref={provided.innerRef}>
          {taskKeys?.map((item, index) => {
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
          })}
          {provided.placeholder}
        </Container>
      )}
    </Droppable>
  );
}

export default DropableComponent;
