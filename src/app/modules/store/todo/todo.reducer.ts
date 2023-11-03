import { Action, createReducer, on } from '@ngrx/store';
import { genUniqueId } from '../utils';
import { ErrorMessages } from './error-messages';
import * as actions from './todo.actions';

export const TODO_FEATURE_KEY = 'todo-store';

export enum TodoStatus {
  Complete = 'COMPLETE',
  InProgress = 'IN_PROGRESS',
}

export interface Todo {
  id: number;
  name?: string;
  status: TodoStatus;
}

export interface TodoState {
    todoList: Todo[];
    error?: string;
}

export const initialState: TodoState = {
  todoList: []
}

const todoReducer = createReducer(
    initialState,
    on(actions.getTodosSuccess, (state, { todoList }) => ({
      ...state,
      todoList: todoList
    })),
    on(actions.getTodosFailure, (state, { error }) => ({
      ...state,
      error: ErrorMessages.LoadTodosFailure
    })),
    on(actions.addTodo, (state, { name }) => ({
      ...state,
      todoList: [...state.todoList, {id: genUniqueId(), name: name, status: TodoStatus.InProgress}]
    })),
    on(actions.changeTodoName, (state, { todo }) => ({
      ...state,
      todoList: state.todoList.map(el => (el.id === todo.id) ? {...el, name: todo.name} : el)
    })),
    on(actions.changeTodoStatus, (state, { todo }) => ({
      ...state,
      todoList: state.todoList.map(el => (el.id === todo.id) ? {...el, status: todo.status} : el)
    })),
    on(actions.removeTodo, (state, { id }) => ({
      ...state,
      todoList: state.todoList.filter(el => el.id !== id)
    })),
);

export function reducer(state: TodoState | undefined, action: Action) {
    return todoReducer(state, action);
}
