import React from 'react';

import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import style from './styles.styl';
import Todo from './Todo';

import { callGetAllTodo, callAddTodo } from '../../redux/async-actions';

class Home extends React.Component {
  render() {
    const { todos, dispatchCallAddTodo } = this.props;
    const currentDate = (new Date()).toLocaleDateString();

    const handleAddTodo = (e) => {
      if (e.key === 'Enter') {
        const elem = e.target;
        e.preventDefault();
        dispatchCallAddTodo(elem.value);
        elem.value = '';
      }
    };

    return (
      <div styleName="todo-wrapper">
        <div
          styleName="todo-day-container"
        >
        {currentDate}
        </div>
        <input
          type="text"
          styleName="add-todo-input"
          placeholder="Add MIT  ..."
          onKeyPress={handleAddTodo}
        />
        <div>
          {todos.map((t, i) =>
            <Todo
              id={t._id}
              message={t.message}
              finished={t.finished}
              createdAt={t.createdAt}
              key={i}
            />)}
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  todos: React.PropTypes.array.isRequired,
  dispatchCallAddTodo: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ todos: state.todos });
const mapDispatchToProps = (dispatch) => ({
  dispatchCallAddTodo: data => dispatch(callAddTodo(data)),
  callGetAllTodo: data => dispatch(callGetAllTodo(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(cssModules(Home, style));
