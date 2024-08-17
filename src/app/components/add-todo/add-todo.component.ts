import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { User } from 'firebase/auth';
import { AuthService } from '../../auth.service';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.scss'
})
export class AddTodoComponent implements OnInit {
  todosCollection: AngularFirestoreCollection<Todo>;
  user: User | null = null;
  constructor(
    private afs: AngularFirestore,
    private auth: AuthService
  ) {
    this.todosCollection = afs.collection<Todo>('todos');
   }

  ngOnInit(): void {
    this.auth.user$.subscribe((user: User | any) => {
      this.user = user;
    });
  }

  addTodo(inputValue:string){
    console.log(inputValue);
    if(inputValue && this.user){
      this.todosCollection.add({
        isCompleted: false,
        title: inputValue,
        userId: this.user.uid
      });
    }
    
  }

}
