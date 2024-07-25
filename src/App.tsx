import React, { memo, useCallback } from "react";
import { useImmerReducer } from "use-immer";

// Definindo a interface Task
interface Task {
  id: string;
  title: string;
  done: boolean;
}
interface Action{
  type: string,
  id: string
}

// Definindo a interface para as propriedades do componente Todo
interface TodoProps {
  todo: Task;
  onToggle: (id: string) => void;
}

export default function App(){
  const [todos, dispatch] = useImmerReducer(
    (draft, action:Action) => {
      switch (action.type) {
        case "toggle":
          const todo = draft.find((todo:Task) => todo.id === action.id);
          if(todo){
            todo.done = !todo.done;
          }
          break;
        case "add":
          draft.push({
            id: action.id,
            title: "A new todo",
            done: false
          });
          break;
        default:
          break;
      }
    },
    [
      {
        id: "React",
        title: "Learn React",
        done: true
      },
      {
        id: "Immer",
        title: "Try immer",
        done: false
      }
    ]
  );
  const unfinishedTodoCount = todos.filter((todo) => todo.done === false).length;

  const handleToggle = useCallback((id:string) => {
    dispatch({
      type: "toggle",
      id:id
    });
  }, [dispatch]);

  const handleAdd = useCallback(() => {
    dispatch({
      type: "add",
      id: "todo_" + Math.random()
    });
  }, [dispatch]);

  return (
    <div>
      <button onClick={handleAdd}>Add Todo</button>
      <ul>
        {todos.map((todo:Task) => (
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

