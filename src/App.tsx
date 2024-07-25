import React, { memo, useCallback } from "react";
import { useImmer } from "use-immer";

// Definindo a interface Task
interface Task {
  id: string;
  title: string;
  done: boolean;
}

// Definindo a interface para as propriedades do componente Todo
interface TodoProps {
  todo: Task;
  onToggle: (id: string) => void;
}

export default function App(){
  const [todos, setTodos] = useImmer([
    {
      id: "React",
      title: "Learn React",
      done: true
    },
    {
      id: "Immer",
      title: "Try Immer",
      done: false
    }
  ]);
  const unfinishedTodoCount = todos.filter((todo) => todo.done === false).length;

  const handleToggle = useCallback((id:string) => {
    setTodos((draft:Task[]) => {
      const todo = draft.find((todo) => todo.id === id);
      if(todo){
        todo.done = !todo.done;
      }
    });
  }, [setTodos]);

  const handleAdd = useCallback(() => {
    setTodos((draft) => {
      draft.push({
        id: "todo_" + Math.random(),
        title: "A new todo",
        done: false
      });
    });
  }, [setTodos]);

  return (
    <div>
      <button onClick={handleAdd}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <Todo todo={todo} key={todo.id} onToggle={handleToggle} />
        ))}
      </ul>
      Tasks left: {unfinishedTodoCount}
    </div>
  );
};

const Todo: React.FC<TodoProps> = memo(({ todo, onToggle }) => (
  <li>
    <input
      type="checkbox"
      checked={todo.done}
      onClick={() => onToggle(todo.id)}
    />
    {todo.title}
  </li>
));

