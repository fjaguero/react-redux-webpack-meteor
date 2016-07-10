import { addTodo, getAllTodo, removeTodo, editTodo } from './actions';
import { asteroid } from '../asteroid/asteroid';

export function callAddTodo(message) {
  return dispatch => asteroid.call('addTodo', message)
      .then(result => dispatch(addTodo({ _id: result, message })));
}

export function callGetAllTodo(startDate, endDate) {
  return dispatch => asteroid.call('getTodos', startDate, endDate)
      .then((result) => dispatch(getAllTodo(result)));
}

export function callRemoveTodo(_id) {
  return dispatch => asteroid.call('removeTodo', _id)
      .then(() => dispatch(removeTodo(_id)));
}

export function callEditTodo(_id, finished) {
  return dispatch => asteroid.call('editTodo', _id, finished)
      .then(() => dispatch(editTodo(_id, finished)));
}
