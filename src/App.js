// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import TodoList from './components/TodoList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} exact />
        <Route path="todolist" element={<TodoList />} exact />
      </Routes>
    </Router>
  );
};

export default App;
