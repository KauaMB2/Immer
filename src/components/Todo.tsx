import { memo } from "react";
import { ITodo } from "../pages/Home";

interface TodoProps {
  todo: ITodo;
  onToggle(id: string): void;
}

const Todo = memo(({ todo, onToggle }: TodoProps) => (
  <li>
    <input
      type="checkbox"
      checked={todo.done}
      onClick={() => onToggle(todo.id)}
    />
    {todo.title}
  </li>
));

export default Todo;
