import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database'; 

export interface User {
  $key: number;
  'name': string,
  'img' : string,
  'email': string,
  'role': string,
  'status': string,
  'creationDate': number
}

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  userRef: AngularFireObject<any>;
  usersRef: AngularFireList<any>;
  constructor(private db: AngularFireDatabase) { }
  
  // Create User
  AddUser(user: User) {
    var newPostRef = this.usersRef.push({
      name: user.name,
      img: user.img,
      email : user.email,
      role: user.role,
      status: user.status,
      creationDate :user.creationDate
    })
  }

   // Fetch Single User Object
   GetUser(key: string) {
    this.userRef = this.db.object('users-list/' + key);
    return this.userRef;
  }

    // Fetch Users List
    GetUsersList() {
      this.usersRef = this.db.list('users-list');
      return this.usersRef;
    }  
  
    // Update User Object
    UpdateUser(user: User) {
      this.userRef.update({
        name: user.name,
        img: user.img,
        email : user.email,
        role: user.role,
        status: user.status,
        creationDate :user.creationDate
      })
    }  
  
    // Delete User Object
    DeleteUser(key: string) { 
      this.userRef = this.db.object('users-list/'+key);
      this.userRef.remove();
    }
    
  
  
}
