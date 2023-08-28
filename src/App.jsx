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
      content: '본문1',
    },
    {
      id: 2,
      title: '자바스크립트 공부하기',
      content: '본문2',
    },
    {
      id: 3,
      title: 'html&css 공부하기',
      content: '본문3',
    },
  ]);

  const onInsert = (newTodo) => {
    const todo = {
      id: nextId.current,
      title: newTodo.title,
      content: newTodo.content,
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

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onUpdate={onUpdate} onRemove={onRemove} />
    </TodoTemplate>
  );
};

export default App;
