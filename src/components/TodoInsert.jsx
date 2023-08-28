import React, { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { styled, css } from 'styled-components';

const TodoInsert = ({ onInsert }) => {
  const initialState = {
    title: '',
    content: '',
  };

  const [todo, setTodo] = useState(initialState);

  const onChangeTodoHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    console.log(name);
    // name이 title이면 todo.title 을 set 해주고, -> todo['title'] = value
    // name이 content이면 todo.content set 해준다. -> todo['content'] = value

    // js 문법 객체의 값을 바꿀 때
    // todo.title = 1
    // todo['title'] = 1

    setTodo({ ...todo, [name]: value }); // ... 현재 todo 값을 복사
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onInsert(todo);
    setTodo(initialState); // 제목, 본문 모두 빈값으로
  };

  return (
    <TodoInsertContainer>
      <form onSubmit={onSubmit}>
        <TodoInsertInput>
          <input
            type='text'
            name='title'
            placeholder='제목을 입력하세요'
            value={todo.title}
            onChange={onChangeTodoHandler}
          />

          <input
            type='text'
            name='content'
            placeholder='본문을 입력해주세요'
            value={todo.content}
            onChange={onChangeTodoHandler}
          />
          <TodoInsertButton>
            <button>
              <MdAdd />
            </button>
          </TodoInsertButton>
        </TodoInsertInput>
      </form>
    </TodoInsertContainer>
  );
};

export default TodoInsert;

const TodoInsertContainer = styled.div`
  display: flex;
  background: #495057;
`;

const TodoInsertInput = styled(TodoInsertContainer)`
  background: none;
  outline: none;
  border: none;
  padding: 0.5rem;
  font-size: 1.125rem;
  line-height: 1.5;
  color: white;
  // &::placeholder {
  //   color: #dee2e6;
  // }
  flex: 1;
`;

const TodoInsertButton = styled(TodoInsertContainer)`
  background: none;
  outline: none;
  border: none;
  // background: #868e96;
  color: white;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 0.1s background ease-in;
`;
