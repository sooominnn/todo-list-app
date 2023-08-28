import React, { useState, useRef } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import { styled, css } from 'styled-components';

const App = () => {
  const nextId = useRef(4);
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: '리액트 공부하기',
      content: '1장~5장',
      checked: true,
    },
    {
      id: 2,
      title: '자바스크립트 공부하기',
      content: '3장',
      checked: true,
    },
    {
      id: 3,
      title: 'html&css 공부하기',
      content: '4장~7장',
      checked: true,
    },
  ]);

  const onInsert = (newTodo) => {
    const todo = {
      id: nextId.current,
      title: newTodo.title,
      content: newTodo.content,
      checked: false,
    };

    setTodos(todos.concat(todo));
    nextId.current += 1;
  };

  const onRemove = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const onUpdate = (todo) => {
    const target = todos.findIndex((currentTodo) => currentTodo.id === todo.id);
    const newTodos = [...todos];
    newTodos.splice(target, 1, todo);
    setTodos(newTodos);
  };

  const onToggle = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };

  return (
    <Index>
      <TodoTemplate>
        <TodoInsert onInsert={onInsert} />
        <TodoList
          todos={todos}
          onUpdate={onUpdate}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      </TodoTemplate>
    </Index>
  );
};

export default App;

const Index = styled.div`
  margin: 0;
  padding: 0;
  background-color: #e9ecef;
`;
