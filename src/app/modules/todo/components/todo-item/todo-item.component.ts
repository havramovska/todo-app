import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { changeTodoName, changeTodoStatus, removeTodo } from 'src/app/modules/store/todo/todo.actions';
import { Todo, TodoStatus } from 'src/app/modules/store/todo/todo.reducer';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit{
  @Input() todo: Todo = { id: 0, name: '', status: TodoStatus.InProgress };
  nameControl: FormControl = new FormControl();

  constructor(    
    private store: Store,
  ) { 
  }

  ngOnInit(): void {
    this.nameControl = new FormControl({
      value: this.todo.name, 
      disabled: this.todo.status === TodoStatus.Complete
    }, [Validators.required]);
  }

  changeTodoName(todo: Todo) {
    const newName = this.nameControl.value;
    if (this.nameControl.valid) {
      const updatedTodo: Todo = { ...todo, name: newName };
      this.store.dispatch(changeTodoName({ todo: updatedTodo }));
    }
  }

  changeTodoStatus(todo: Todo) {
    if (todo.status === TodoStatus.InProgress) {
      const updatedTodo: Todo = { ...todo, status: TodoStatus.Complete };
      console.log(updatedTodo)
      this.store.dispatch(changeTodoStatus({ todo: updatedTodo }));
    }
  }

  removeTodo(id: number) {
    this.store.dispatch(removeTodo({ id }))
  }

}
