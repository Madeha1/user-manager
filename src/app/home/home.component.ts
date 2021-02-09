import { Component, OnInit } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { User, UsersService } from "../users.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  constructor(private usersService:UsersService){}
  users: User[];

  ngOnInit(): void {
    this.usersService.GetUsersList().valueChanges().subscribe(data => {});
    console.log('test');
    let s = this.usersService.GetUsersList(); 
    s.snapshotChanges().subscribe(data => {
      this.users = [];
      data.forEach(item => {
        let a = item.payload.toJSON(); 
        a['$key'] = item.key;
        this.users.push(a as User);
      })
    })
  }

  searchText:string = '';
}
