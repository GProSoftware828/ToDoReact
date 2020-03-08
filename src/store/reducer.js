import * as actionTypes from './actions';
import ls from 'local-storage';

const initialState = {
  todos: ls.get('toDos') || [
    { title: 'note one', id: '231r' },
    { title: 'note two', id: 'efef' },
    { title: 'note three', id: 'sd09s' }
  ],
  completed: ls.get('completeds') || [
    { title: '1', id: 'grhwg' },
    { title: '2', id: '9joi' }
  ]
};

const reducer = (state = initialState, action) => {
  switch (action.types) {
    case actionTypes.ADD_TODO:
      return {
        ...state,
        todos: {
          ...state.todos,
          [action.todoTitle]: state.todos[action.todoTitle] + 1
        }
      };
    case actionTypes.REMOVE_TODO:
      return {
        ...state,
        todos: {
          ...state.todos,
          [action.todoTitle]: state.todos[action.todoTitle] - 1
        }
      };
    case actionTypes.ADD_COMPLETED:
      return {
        ...state,
        completed: {
          ...state.completeds,
          [action.completedTitle]: state.completeds[action.completedTitle] + 1
        }
      };
    case actionTypes.REMOVE_COMPLETED:
      return {
        ...state,
        completed: {
          ...state.completeds,
          [action.completedTitle]: state.completeds[action.completedTitle] - 1
        }
      };
    default:
      return state;
  }
};

export default reducer;
