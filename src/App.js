import React from 'react';
import { connect } from 'react-redux';
import UniqueId from 'react-html-id';
import { ToDo } from './ToDo/ToDo';
import { Completed } from './Completed/Completed';
import './App.css';
import Plus from './assets/graphics/Plus.svg';
import {
  onTodoAdded,
  onTodoCompleted,
  onRemoveItem
} from './store/actionCreators';

export class App extends React.Component {
  constructor(props) {
    super(props);
    UniqueId.enableUniqueIds(this);
    this.state = {
      showForm: false,
      showCompleted: false
    };
  }

  addItem(e) {
    e.preventDefault();
    let newItem = { title: this.newItem.value };
    this.props.onTodoAdded(newItem);
  }

  toggleInputHandler = () => {
    this.setState({ showForm: !this.state.showForm });
  };
  toggleCompletedHandler = () => {
    this.setState({ showCompleted: !this.state.showCompleted });
  };

  render() {
    const { message } = this.state;
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

export default connect(mapStateToProps, {
  onTodoAdded,
  onTodoCompleted,
  onRemoveItem
})(App);
