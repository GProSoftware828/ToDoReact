import _ from 'lodash';
import * as actionTypes from './actions';

//call fetchTodos for todos:
//move it back into app.js:
export const initialState = {
  todos: [],
  completed: [],
  todoCount: 3
};
// default value is the todos from the thunk call not initialState:
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TODO:
      return {
        ...state,
        todos: _.concat(state.todos, action.todoTitle),
        todoCount: _.add(state.todoCount, action.todoAdded)
      };
    case actionTypes.ADD_COMPLETED:
      return {
        ...state,
        todos: _.pull(state.todos, action.todoTitle),
        completed: _.concat(state.completed, action.todoTitle)
      };
    case actionTypes.REMOVE_COMPLETED:
      return {
        ...state,
        completed: state.completed.filter(function(unFinishedCompleteds) {
          return unFinishedCompleteds !== action.completedItem;
        })
      };
    case actionTypes.FETCH_TODOS:
      const starterTodo1 = { title: action.todosInitial1, id: 'aoifo' };
      const starterTodo2 = { title: action.todosInitial2, id: 'aoqwrq43o' };
      const starterTodo3 = { title: action.todosInitial3, id: 'omlkfo' };
      const starterCompleted1 = {
        title: action.completedInitial1,
        id: '9erjgo'
      };
      const starterCompleted2 = {
        title: action.completedInitial2,
        id: 'asdfe'
      };
      const starterCompleted3 = {
        title: action.completedInitial3,
        id: '09kvdsc'
      };
      return {
        ...state,
        todos: _.concat(starterTodo1, starterTodo2, starterTodo3),
        completed: _.concat(
          starterCompleted1,
          starterCompleted2,
          starterCompleted3
        )
      };
    default:
      return state;
  }
};

export default reducer;
