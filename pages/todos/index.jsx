import { useTodos } from '@/context/TodosProvider';

function TodoList() {
  const [todos, dispatchTodos] = useTodos();

  console.log(todos);

  return <></>;
}

export default TodoList;
