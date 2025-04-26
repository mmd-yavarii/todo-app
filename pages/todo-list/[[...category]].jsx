import { useTodos } from '@/context/TodosProvider';

function TodoList() {
  const [todos, dispatchTodos] = useTodos();

  return (
    <>
      <h1>hello</h1>
    </>
  );
}

export default TodoList;
