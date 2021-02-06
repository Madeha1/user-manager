import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  users = [
    {
      'ID':1,
      'name':'madeha',
      'img' : 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png',
      'email':'madehatahboub@gmail.com',
      'role': 'student',
      'status': 's',
      'creationDate': '12-6-2021'
    }
  ];

}
