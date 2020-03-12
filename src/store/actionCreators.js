import * as actionTypes from './actions';
import jsonPlaceholder from '../apis/jsonplaceholder';

export const onTodoAdded = todo => {
  return {
    type: actionTypes.ADD_TODO,
    todoTitle: todo,
    todoAdded: 1
  };
};

export const onTodoCompleted = todo => {
  return {
    type: actionTypes.ADD_COMPLETED,
    todoTitle: todo,
    todoAdded: -1
  };
};

export const onRemoveItem = todo => {
  return {
    type: actionTypes.REMOVE_COMPLETED,
    completedItem: todo
  };
};

export const fakeTodos = () => async dispatch => {
  const response = await jsonPlaceholder.get('/todos');
  const initialState1 = response.data[0].title;
  const initialState2 = response.data[1].title;
  const initialState3 = response.data[2].title;
  const initialState4 = response.data[3].title;
  const initialState5 = response.data[4].title;
  const initialState6 = response.data[5].title;
  dispatch({
    type: 'FETCH_TODOS',
    todosInitial1: initialState1,
    todosInitial2: initialState2,
    todosInitial3: initialState3,
    completedInitial1: initialState4,
    completedInitial2: initialState5,
    completedInitial3: initialState6
  });
};
