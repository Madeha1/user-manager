import { Component, OnInit } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  searchText:string;
  filterTerm: string;
  users = [
    {
      'id':1,
      'name':'madeha',
      'img' : 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png',
      'email':'madehatahboub@gmail.com',
      'role': 'student',
      'status': 's',
      'creationDate': '12-6-2021'
    }
  ];

  search(){
    this.filterTerm = this.searchText;
  }
  
}
