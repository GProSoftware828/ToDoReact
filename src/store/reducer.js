import _ from 'lodash';
import * as actionTypes from './actions';

const initialState = {
  todos: [
    { title: 'note one', id: '34234' },
    { title: 'note two', id: '32k23' },
    { title: 'note three', id: '234kl' }
  ],
  completed: [
    { title: 'note abc', id: 'oi3mlkw' },
    { title: 'note cleanup', id: '24k4m' }
  ]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TODO:
      return {
        ...state,
        todos: _.concat(state.todos, action.todoTitle)
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
    default:
      return state;
  }
};

export default reducer;
