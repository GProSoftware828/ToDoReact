import React from 'react';
import { connect } from 'react-redux';
import UniqueId from 'react-html-id';
import { ToDo } from './ToDo/ToDo';
import { Completed } from './Completed/Completed';
import ls from 'local-storage';
import './App.css';
import Plus from './assets/graphics/Plus.svg';
import * as actionTypes from './store/actions';

export class App extends React.Component {
  constructor(props) {
    super(props);
    UniqueId.enableUniqueIds(this);
    this.state = {
      // todos: ls.get('toDos') || [
      //   { title: 'note one', id: '231r' },
      //   { title: 'note two', id: 'efef' },
      //   { title: 'note three', id: 'sd09s' }
      // ],
      // message: '',
      // completed: ls.get('completeds') || [
      //   { title: '1', id: 'grhwg' },
      //   { title: '2', id: '9joi' }
      // ],
      showForm: false,
      showCompleted: false
    };
  }

  // this.props.onTodoAdded(e)
  async addItem(e) {
    e.preventDefault();
    let newItem = { title: this.newItem.value };
    this.props.onTodoAdded(newItem);
    // const isOnTheList = this.state.todos.includes(newItem);
    // if (isOnTheList) {
    //   this.setState({
    //     message: 'This To-do is already on the list.'
    //   });
    // } else {
    //   newItem =
    //     { title: this.newItem.value, id: this.nextUniqueId() } &&
    //     newItem !== '' &&
    //     this.setState({
    //       todos: [...this.state.todos, newItem],
    //       message: 'Added entry to to-do list'
    //     });
    //   await localStorage.setItem('toDos', JSON.stringify(this.state.todos));
    // }
    // this.addForm.reset();
    // await localStorage.setItem('toDos', JSON.stringify(this.state.todos));
    // const store = await localStorage.getItem('toDos');
    // const newTodos = JSON.parse(store);
  }

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
  // async removeItem(item) {
  //   const newTodos = this.state.completed.filter(todo => {
  //     return todo !== item;
  //   });
  //   if (1 === 1) {
  //     this.setState({
  //       completed: [...newTodos],
  //       message: 'Deleted old to-do'
  //     });
  //     await localStorage.setItem('completeds', JSON.stringify([...newTodos]));
  //   }
  //   await localStorage.setItem('completeds', JSON.stringify([...newTodos]));
  //   const completedRemovals = await localStorage.getItem('completeds');
  // }

  toggleInputHandler = () => {
    const doesShow = this.state.showForm;
    this.setState({ showForm: !doesShow });
  };
  toggleCompletedHandler = () => {
    const doesShow = this.state.showCompleted;
    this.setState({ showCompleted: !doesShow });
  };

  render() {
    const { /*todos, completed,*/ message } = this.state;
    const { todos, completed } = this.props;
    return (
      <div>
        <div className="header">
          <h1 className="banner">Your To-Do's</h1>
          <p className="msg">{message}</p>
          <img
            src={Plus}
            alt="plus_clickme_show_input_form"
            onClick={this.toggleInputHandler}
            className="plus"
          />

          {this.state.showForm === true ? (
            <div className="inputForm">
              <form
                ref={input => (this.addForm = input)}
                onSubmit={e => {
                  this.addItem(e);
                  // console.log('event: ', e);
                  // this.props.onTodoAdded(e);
                }}
              >
                <div>
                  <input
                    type="text"
                    placeholder="Type To-do Here"
                    id="newItemInput"
                    ref={input => (this.newItem = input)}
                    className="input"
                  />
                  <br />
                  <br />
                  <button className="button" type="submit">
                    Add
                  </button>
                  <br />
                  <br />
                </div>
              </form>
            </div>
          ) : null}
        </div>

        <div className="block">
          <table>
            <tbody>
              <tr>
                <td>
                  {todos.map(item => (
                    <ToDo
                      // click={() => this.completedItem(item)}
                      click={() => this.props.onTodoCompleted(item)}
                      title={item.title}
                      key={item.id}
                    />
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
          <button
            className="completedBtn"
            onClick={this.toggleCompletedHandler}
          >
            Show Completed
          </button>
          {this.state.showCompleted === true ? (
            <div>
              <table>
                <tbody>
                  <tr>
                    <td>
                      {completed.map(item => (
                        <Completed
                          // click={() => this.removeItem(item)}
                          click={() => this.props.onRemoveItem(item)}
                          title={item.title}
                          key={item.id}
                        />
                      ))}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    todos: state.todos,
    completed: state.completed
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTodoAdded: ToDoTitle =>
      dispatch(
        { type: actionTypes.ADD_TODO, todoTitle: ToDoTitle },
        console.log('dispatch called no payload')
      ),
    onTodoCompleted: ToDoTitle =>
      dispatch(
        {
          type: actionTypes.ADD_COMPLETED,
          todoTitle: ToDoTitle
        },
        console.log('completed called no payload', ToDoTitle)
      ),
    onRemoveItem: CompletedTitle =>
      dispatch(
        {
          type: actionTypes.REMOVE_COMPLETED,
          completedItem: CompletedTitle
        },
        console.log('removed called no payload')
      )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
