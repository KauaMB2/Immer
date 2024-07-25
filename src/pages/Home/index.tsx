import { useCallback, useState } from "react";

import {produce} from "immer";

import Todo from "../../components/Todo";

export interface ITodo {
  id: string;
  title: string;
  done: boolean;
}

const Home = () => {
  const [todos, setTodos] = useState<ITodo[]>([
    {
      id: "React",
      title: "Learn React",
      done: true,
    },
    {
      id: "Immer",
      title: "Try Immer",
      done: false,
    },
  ]);

  const unfinishedTodoCount = todos.filter(
    (todo) => todo.done === false,
  ).length;

  /**
   *  const newObj = produce(obj, (draft) => {
   *    draft.done = false
   *  })
   *
   *  const producer = produce((draft) => {
   *    draft.done = false
   *  });
   *  const newObj = producer(obj)
   */

  const handleToggle = useCallback((id: string) => {
    setTodos(
      produce((draft) => {
        const todo = draft.find((todo) => todo.id === id);
        if (todo) {
          todo.done = !todo.done;
        }
      }),
    );
  }, []);

  const handleAdd = useCallback(() => {
    /* setTodos((todos) => {
      const list = [...todos];
      list.push({
        id: "todo_" + Math.random(),
        title: "A new todo",
        done: false,
      });
      return list;
    }); */

    setTodos(
      produce((draft) => {
        draft.push({
          id: "todo_" + Math.random(),
          title: "A new todo",
          done: false,
        });
      }),
    );
  }, []);

  return (
    <div className="container">
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

export default Home;
