import React, { useState } from 'react';
import TodoListItem from './TodoListItem';
import { styled, css } from 'styled-components';

const TodoList = ({ todos, onUpdate, onRemove }) => {
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
        <TodoListItemContainer>
          <TodoListItemContainerCheckBox>
            {todos.map((todo) => (
              <TodoListItem
                todo={todo}
                key={todo.id}
                onUpdate={onUpdate}
                onRemove={onRemove}
              />
            ))}
          </TodoListItemContainerCheckBox>
        </TodoListItemContainer>
      </TodoListContainer>
    </>
  );
};

export default TodoList;

const TodoListContainer = styled.div`
  min-height: 320px;
  max-height: 513px;
  overflow-y: auto;
  // border: 1px solid blue;
`;

const TodoListItemContainer = styled(TodoListContainer)`
  padding: 1rem;
  display: flex;
  align-items: center;
`;

const TodoListItemContainerCheckBox = styled(TodoListContainer)`
  cursor: pointer;
  flex: 1; // 차지할 수 있는 영역 모두 차지
  // display: flex;
  // align-items: center;
`;
