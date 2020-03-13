import React from 'react';
import { connect } from 'react-redux';
import UniqueId from 'react-html-id';
import { ToDo } from './ToDo/ToDo';
import { Completed } from './Completed/Completed';
import './App.css';
import Plus from './assets/graphics/Plus.svg';
import axios from './apis/firebase';
import checkmark from './assets/graphics/checkmark.png';
import Xfinished from './assets/graphics/Xfinished.png';
import {
  onTodoAdded,
  onTodoCompleted,
  onRemoveItem,
  fakeTodos
} from './store/actionCreators';

export class App extends React.Component {
  constructor(props) {
    super(props);
    UniqueId.enableUniqueIds(this);
    this.state = {
      message: '',
      showForm: false,
      showCompleted: false
    };
  }

  componentDidMount() {
    this.props.fakeTodos();
    const now = new Date();
    const newVisitor = { visited: now };
    axios.post('visitors.json', newVisitor);
  }

  async addItem(e) {
    e.preventDefault();
    if (this.props.todoCount < 5) {
      let newItem = { title: this.newItem.value };
      this.props.onTodoAdded(newItem);
    }
  }
  toggleInputHandler = () => {
    const doesShow = this.state.showForm;
    this.setState({ showForm: !doesShow });
  };
  toggleCompletedHandler = () => {
    const doesShow = this.state.showCompleted;
    this.setState({ showCompleted: !doesShow });
  };

  render() {
    const { message, showForm, showCompleted } = this.state;
    const { todos, completed } = this.props;
    return (
      <div>
        <div className="horizontalContainer">
          <div
            className="horizontalRow1 bkgdAdd pointer"
            onClick={this.toggleInputHandler}
          >
            <img
              src={Plus}
              alt="plus_clickme_show_input_form"
              className="plus"
            />
            Click to Add a Todo
          </div>
          <div className="horizontalRow2 bkgdTitle colTwoTitlesStyle">
            Task Manager
          </div>
          <div className="horizontalRow3 bkgdInstr instrStyles">
            You can download the app to see dummy data coming in from
            JSONplaceholder.typicode.com using a restful HTTP request with Axios
            (lucky you if the browser let's CORS pass and you see it
            sometimes!). For now, please add and complete a task!
          </div>
        </div>
        {/* <p className="msg">{message}</p> */}
        {showForm === true ? (
          <div className="horizontalContainer">
            <div className="horizontalRow1"></div>
            <div className="horizontalRow2"></div>
            <form
              ref={input => (this.addForm = input)}
              onSubmit={e => {
                this.addItem(e);
              }}
            >
              <div className="horizonalRow3 formStyles">
                <input
                  type="text"
                  className="formInput"
                  placeholder="Type To-do Here"
                  id="newItemInput"
                  ref={input => (this.newItem = input)}
                />
                <button className="formBtn" type="submit">
                  Add
                </button>
              </div>
            </form>
          </div>
        ) : null}
        <div className="horizontalContainer todoTitleMargin">
          <div className="horizontalRow2 bkgdTodoTitle colTwoTitlesStyle">
            Todos:
          </div>
          <div className="horizontalRow3 bkgdInstr instrStyles">
            You cannot have more than five open tasks. Finish them before adding
            others.
          </div>
        </div>
        <div className="horizontalContainer todoListBtm">
          {todos.map(item => (
            <React.Fragment>
              <div
                className="horizontalRow1 pointer iconsPosition"
                onClick={() => this.props.onTodoCompleted(item)}
              >
                <img
                  data-test="clicker"
                  src={checkmark}
                  alt="checkmark"
                  height="32"
                  width="32"
                />
              </div>
              <div
                className="horizontalRow2 listStyles todoStyles listBtmBorder pointer"
                onClick={() => this.props.onTodoCompleted(item)}
              >
                Click to Make Completed
              </div>
              <div className="horizontalRow3">
                <ToDo
                  title={item.title}
                  key={item.id}
                  click={() => this.props.onTodoCompleted(item)}
                />
              </div>
            </React.Fragment>
          ))}
        </div>
        <div className="marginTopComp">
          <div className="horizontalContainer">
            <div
              className="horizontalRow2 bkgdComplTitle colTwoTitlesStyle"
              onClick={this.toggleCompletedHandler}
            >
              Show Completed
            </div>
          </div>
        </div>
        {showCompleted === true ? (
          <div className="horizontalContainer completedListMargin">
            {completed.map(item => (
              <React.Fragment>
                <div
                  className="horizontalRow1 iconsPosition pointer"
                  onClick={() => this.props.onRemoveItem(item)}
                >
                  <img
                    data-test="clicker"
                    src={Xfinished}
                    alt="completed_X_mark"
                    height="32"
                    width="32"
                  />
                </div>
                <div
                  className="horizontalRow2 bkgdInstr listStyles listBtmBorder completedStyles pointer"
                  onClick={() => this.props.onRemoveItem(item)}
                >
                  Click to Remove
                </div>
                <div className="horizontalRow3">
                  <Completed
                    click={() => this.props.onRemoveItem(item)}
                    title={item.title}
                    key={item.id}
                  />
                </div>
              </React.Fragment>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    todos: state.todos,
    completed: state.completed,
    todoCount: state.todoCount
  };
};

export default connect(mapStateToProps, {
  onTodoAdded,
  onTodoCompleted,
  onRemoveItem,
  fakeTodos
})(App);
