import { createContext, useContext, useReducer } from 'react';

const TodosContext = createContext();

const initialState = [
  { id: 1, status: 'pending', title: 'helo' },
  { id: 2, status: 'pending', title: 'helo' },
];

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_NEW':
      return [...state, action.payload];

    case 'REMOVE':
      return state.filter((i) => i.id != action.payload.id);

    case 'CHANGE_STATUS':
      const todoStatus = state.find((i) => i.id == action.payload.id);
      todoStatus.status = todoStatus.state == 'pending' ? 'done' : 'pending';
      return state;

    case 'EDIT':
      const todoEdit = state.find((i) => i.id == action.payload.id);
      todoEdit.status = todoEdit.state == 'pending' ? 'done' : 'pending';
      return state;

    default:
      throw new Error('Action is not valied');
  }
}

function TodosProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <TodosContext.Provider value={{ state, dispatch }}>{children}</TodosContext.Provider>;
}

// customhook for provide context easily
function useTodos() {
  const { state, dispatch } = useContext(TodosContext);
  return [state, dispatch];
}

export default TodosProvider;
export { useTodos };
