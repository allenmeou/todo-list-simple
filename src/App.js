import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([
    {
      content: "Pickup dry cleaning",
      isCompleted: false,
    },
    {
      content: "Get haircut",
      isCompleted: false,
    },
    {
      content: "Build a todo app in React",
      isCompleted: false,
    },
  ]);

  // handle new todo
  const handleNewTodo = (event, index) => {
    if (event.key === "Enter") {
      createTodoAtIndex(event, index);
    }
    if (event.key === "Backspace" && todos[index].content === "") {
      event.preventDefault();
      return removeTodoAtIndex(index);
    }
  };

  // handle create todo
  const createTodoAtIndex = (event, index) => {
    const newTodos = [...todos];
    newTodos.splice(index + 1, 0, {
      content: "",
      isCompleted: false,
    });
    setTodos(newTodos);
    setTimeout(() => {
      document.forms[0].elements[index + 1].focus();
    }, 0);
  };

  // handle update todo
  const updateTodoAtIndex = (event, index) => {
    const newTodos = [...todos];
    newTodos[index].content = event.target.value;
    setTodos(newTodos);
  };

  // handle remove todo
  function removeTodoAtIndex(i) {
    if (i === 0 && todos.length === 1) return;
    setTodos((todos) =>
      todos.slice(0, i).concat(todos.slice(i + 1, todos.length))
    );
    setTimeout(() => {
      document.forms[0].elements[i - 1].focus();
    }, 0);
  }

  // handle toggle Todo Complete
  function toggleTodoCompleteAtIndex(index) {
    const temporaryTodos = [...todos];
    temporaryTodos[index].isCompleted = !temporaryTodos[index].isCompleted;
    setTodos(temporaryTodos);
  }

  return (
    <div className="App">
      <div className="header">
        <img srcSet={logo} className="logo" alt="logo" />
      </div>
      <form className="todo-list">
        <ul>
          {todos.map((todo, index) => {
            return (
              <div
                className={`todo ${todo.isCompleted && "todo-is-completed"}`}
                key={index}
              >
                <div
                  className={"checkbox"}
                  onClick={() => toggleTodoCompleteAtIndex(index)}
                >
                  {todo.isCompleted && <span>&#x2714;</span>}
                </div>
                <input
                  type="text"
                  defaultValue={todo.content}
                  onKeyDown={(event) => handleNewTodo(event, index)}
                  onChange={(event) => updateTodoAtIndex(event, index)}
                />
              </div>
            );
          })}
        </ul>
      </form>
    </div>
  );
}

export default App;
