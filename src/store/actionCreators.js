import * as actionTypes from './actions';

export const onTodoAdded = todo => {
  return {
    type: actionTypes.ADD_TODO,
    todoTitle: todo
  };
};

export const onTodoCompleted = todo => {
  return {
    type: actionTypes.ADD_COMPLETED,
    todoTitle: todo
  };
};

export const onRemoveItem = todo => {
  return {
    type: actionTypes.REMOVE_COMPLETED,
    completedItem: todo
  };
};
