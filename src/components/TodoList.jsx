import React, { useState } from 'react';
import TodoListItem from './TodoListItem';
import { styled, css } from 'styled-components';

const TodoList = ({ todos, onUpdate, onRemove, onToggle }) => {
  // const [borderColor, setBorderColor] = useState('green');

  // 버튼을 누르면, 파라미터로 전달한 색으로 변경된다.
  return (
    <>
      {/* <button
        onClick={() => {
          setBorderColor('red');
        }}
      >
        색 변경
      </button> */}
      <TodoListContainer>
        {todos.map((todo) => (
          <TodoListItem
            todo={todo}
            key={todo.id}
            onUpdate={onUpdate}
            onRemove={onRemove}
            onToggle={onToggle}
          />
        ))}
      </TodoListContainer>
    </>
  );
};

export default TodoList;

const TodoListContainer = styled.div`
  min-height: 320px;
  max-height: 513px;
  overflow-y: auto;
`;
