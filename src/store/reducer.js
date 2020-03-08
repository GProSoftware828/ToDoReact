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
  switch (action.types) {
    case actionTypes.ADD_TODO:
      return {
        // const addItem = async (e) => {
        //   e.preventDefault();
        //   console.log('addItem called');
        //   let newItem = { title: this.newItem.value };
        //   const isOnTheList = this.state.todos.includes(newItem);
        //   if (isOnTheList) {
        //     this.setState({
        //       message: 'This To-do is already on the list.'
        //     });
        //   } else {
        //     newItem =
        //       { title: this.newItem.value, id: this.nextUniqueId() } &&
        //       newItem !== '' &&
        //       this.setState({
        //         todos: [...this.state.todos, newItem],
        //         message: 'Added entry to to-do list'
        //       });
        //     await localStorage.setItem(
        //       'toDos',
        //       JSON.stringify(this.state.todos)
        //     );
        //   }
        //   this.addForm.reset();
        //   await localStorage.setItem('toDos', JSON.stringify(this.state.todos));
        //   const store = await localStorage.getItem('toDos');
        //   const newTodos = JSON.parse(store);
        // },
        // additem()
        ...state,
        todos: {
          ...state.todos,
          [action.todoTitle]: state.todos[action.todoTitle] + 1
        }
      };
    case actionTypes.ADD_COMPLETED:
      return {
        // async completedItem(item) {
        //   const newTodos = this.state.todos.filter(todo => {
        //     return todo !== item;
        //   });
        //   if (1 === 1) {
        //     this.setState({
        //       completed: [...this.state.completed, item],
        //       message: 'Added to completed list',
        //       todos: [...newTodos]
        //     });
        //     await localStorage.setItem(
        //       'completeds',
        //       JSON.stringify(this.state.completed)
        //     );
        //     await localStorage.setItem('toDos', JSON.stringify([...newTodos]));
        //   }
        //   await localStorage.setItem(
        //     'completeds',
        //     JSON.stringify(this.state.completed)
        //   );
        //   await localStorage.setItem('toDos', JSON.stringify([...newTodos]));
        //   const completedStore = await localStorage.getItem('completeds');
        //   // this.setState({
        //   //   completedLS: [...completedStore]
        //   // });
        //   console.log('Here is get ');
        //   console.log(JSON.parse(completedStore));
        // }
        ...state,
        completed: {
          ...state.completeds,
          [action.completedTitle]: state.completeds[action.completedTitle] + 1
        },
        todos: {
          ...state.todos,
          [action.todoTitle]: state.todos[action.todoTitle] - 1
        }
      };
    case actionTypes.REMOVE_COMPLETED:
      return {
        // async removeItem(item) {
        //   const newTodos = this.state.completed.filter(todo => {
        //     return todo !== item;
        //   });
        //   if (1 === 1) {
        //     this.setState({
        //       completed: [...newTodos],
        //       message: 'Deleted old to-do'
        //     });
        //     await localStorage.setItem(
        //       'completeds',
        //       JSON.stringify([...newTodos])
        //     );
        //   }
        //   await localStorage.setItem(
        //     'completeds',
        //     JSON.stringify([...newTodos])
        //   );
        //   const completedRemovals = await localStorage.getItem('completeds');
        // }
        // ...state,
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
