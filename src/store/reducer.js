import * as actionTypes from './actions';
// import ls from 'local-storage';

const initialState = {
  // todos: ls.get('toDos') || [
  //   { title: 'note one', id: '231r' },
  //   { title: 'note two', id: 'efef' },
  //   { title: 'note three', id: 'sd09s' }
  // ],
  // completed: ls.get('completeds') || [
  //   { title: '1', id: 'grhwg' },
  //   { title: '2', id: '9joi' }
  // ]
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
      console.log('Reducer payload add: ', action.todoTitle);
      return {
        ...state,
        todos: [...state.todos.concat(action.todoTitle)]
      };
    case actionTypes.ADD_COMPLETED:
      console.log('Reducer payload completed: ', action.todoTitle);
      return {
        ...state,
        completed: [...state.completed.concat(action.todoTitle)]
      };
    case actionTypes.REMOVE_COMPLETED:
      console.log('Reducer payload removed: ', action.completedItem);
      return {
        todos: {
          ...state.todos,
          [action.todoTitle]: state.todos[action.todoTitle] - 1
        }
      };
    default:
      return state;
  }
};

export default reducer;
