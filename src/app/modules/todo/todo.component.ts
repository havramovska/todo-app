import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addTodo, getTodos } from '../store/todo/todo.actions';
import { Todo, TodoStatus } from '../store/todo/todo.reducer';
import { getAllTodos } from '../store/todo/todo.selectors';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  statusEnum = TodoStatus;

  newTodo = new FormControl('', [Validators.required]);

  allTodos$: Observable<Todo[]> = this.store.pipe(select(getAllTodos));

  constructor(
    private store: Store,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.store.dispatch(getTodos());
  }
  
  addNewTodo() {
    if (!this.newTodo.value) return;
    this.store.dispatch(addTodo({ name: this.newTodo.value }))
    this.newTodo.reset()
  }

  hasCompleteTodos(allTodos: Todo[] | null): boolean {
    return allTodos ? allTodos.some(todo => todo.status === TodoStatus.Complete) : false;
  }

  hasInProgressTodos(allTodos: Todo[] | null): boolean {
    return allTodos ? allTodos.some(todo => todo.status === TodoStatus.InProgress) : false;
  }
}
