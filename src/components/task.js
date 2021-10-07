import styled from "styled-components";

const Slide = styled.div`
  border-radius: 2px;
  padding: 8px;
  width: 80%;
  margin: 8px auto;
  background-color: red;
  text-align: center;
  color: white;
`;

function Task({ value }) {
  return (
    <Slide
    // {...provided.draggableProps}
    // {...provided.dragHandleProps}
    // ref={provided.innerRef}
    >
      <p style={{ width: "fit-content" }}>{JSON.stringify(value)}</p>
    </Slide>
  );
}

export default Task;
