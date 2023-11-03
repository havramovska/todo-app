import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TODO_FEATURE_KEY, TodoState } from './todo.reducer';

export const getTodoState = createFeatureSelector<TodoState>(TODO_FEATURE_KEY);

export const getAllTodos = createSelector(getTodoState, (state) => state.todoList);

export const getErrorStatus = createSelector(getTodoState, (state) => state.error);
