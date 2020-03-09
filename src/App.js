import React, { useState, useReducer } from 'react';
import { connect } from 'react-redux';
// import UniqueId from 'react-html-id';
import { ToDo } from './ToDo/ToDo';
import { Completed } from './Completed/Completed';
import './App.css';
import Plus from './assets/graphics/Plus.svg';
import reducer from './store/reducer';

const App = () => {
  // UniqueId.enableUniqueIds(this);

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

  const [showForm, setShowForm] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [newItem, setNewItem] = useState();
  const [state, dispatch] = useReducer(reducer, initialState);

  const addItem = e => {
    e.preventDefault();
    let newItemAdded = { title: newItem };
    dispatch({ type: 'ADD_TODO', todoTitle: newItemAdded });
  };
  const toggleInputHandler = () => {
    setShowForm(!showForm);
  };
  const toggleCompletedHandler = () => {
    setShowCompleted(!showCompleted);
  };

  const { message, todos, completed } = state;
  return (
    <div>
      <div className="header">
        <h1 className="banner">Your To-Do's</h1>
        <div className="instructions">
          Click the plus to add one. Click the todo itself to move lists or
          remove. Click 'Show Completed'.
        </div>
        <p className="msg">{message}</p>
        <img
          src={Plus}
          alt="plus_clickme_show_input_form"
          onClick={toggleInputHandler}
          className="plus"
        />

        {showForm ? (
          <div className="inputForm">
            <form
              onSubmit={e => {
                addItem(e);
              }}
            >
              <div>
                <input
                  type="text"
                  placeholder="Type To-do Here"
                  id="newItemInput"
                  value={newItem}
                  onChange={e => setNewItem(e.target.value)}
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
                    click={() =>
                      dispatch({ type: 'ADD_COMPLETED', todoTitle: item })
                    }
                    title={item.title}
                    key={item.id}
                  />
                ))}
              </td>
            </tr>
          </tbody>
        </table>
        <button className="completedBtn" onClick={toggleCompletedHandler}>
          Show Completed
        </button>
        {showCompleted ? (
          <div>
            <table>
              <tbody>
                <tr>
                  <td>
                    {completed.map(item => (
                      <Completed
                        click={() =>
                          dispatch({
                            type: 'REMOVE_COMPLETED',
                            completedItem: item
                          })
                        }
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
};

const mapStateToProps = state => {
  return {
    todos: state.todos,
    completed: state.completed
  };
};

export default connect(mapStateToProps)(App);
