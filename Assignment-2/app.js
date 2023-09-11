import React, { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([
    { text: 'deneme', done: true },
    { text: 'deneme', done: true },
    { text: 'deneme', done: false },
    { text: 'deneme', done: false },
    { text: 'deneme', done: true },
    { text: 'deneme', done: false },
  ]);

  const [newTodo, setNewTodo] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { text: newTodo, done: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].done = !updatedTodos[index].done;
    setTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const clearCompleted = () => {
    const updatedTodos = todos.filter((todo) => !todo.done);
    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'active') return !todo.done;
    if (activeFilter === 'completed') return todo.done;
    return true;
  });

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTodo();
          }}
        >
          <input
            className="new-todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
        </form>
      </header>
      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          checked={todos.every((todo) => todo.done)}
          onChange={() => {
            const allDone = todos.every((todo) => todo.done);
            const updatedTodos = todos.map((todo) => ({
              ...todo,
              done: !allDone,
            }));
            setTodos(updatedTodos);
          }}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          {filteredTodos.map((todo, index) => (
            <li key={index} className={todo.done ? 'completed' : ''}>
              <div className="view">
                <input
                  className="toggle"
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggleTodo(index)}
                />
                <label>{todo.text}</label>
                <button className="destroy" onClick={() => deleteTodo(index)}>x</button>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <footer className="footer">
        <span className="todo-count">
          <strong>{todos.filter((todo) => !todo.done).length}</strong> items left
        </span>
        <ul className="filters">
          <li>
            <a
              className={activeFilter === 'all' ? 'selected' : ''}
              onClick={() => setActiveFilter('all')}
            >
              All
            </a>
          </li>
          <li>
            <a
              className={activeFilter === 'active' ? 'selected' : ''}
              onClick={() => setActiveFilter('active')}
            >
              Active
            </a>
          </li>
          <li>
            <a
              className={activeFilter === 'completed' ? 'selected' : ''}
              onClick={() => setActiveFilter('completed')}
            >
              Completed
            </a>
          </li>
        </ul>
        <button
          className="clear-completed"
          onClick={clearCompleted}
        >
          Clear completed
        </button>
      </footer>
    </div>
  );
}

export default App;
