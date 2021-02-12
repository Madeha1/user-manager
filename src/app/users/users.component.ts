import { Component, OnInit } from '@angular/core';
import { User, UsersService } from '../users.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private usersService:UsersService,private modalService: NgbModal,private formBuilder:FormBuilder ){}
  users: User[];
  closeResult = '';
  editable= false;
  userForm: FormGroup;
  submitted = false;

  get f() { return this.userForm.controls;}

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

  deleteUser(user) {
    if (window.confirm('Are sure you want to delete this student ?'))
      this.usersService.DeleteUser(user.$key) // Using Delete student API to delete student.
  }


  //Edit Form
  userId;
  editMode(user){
    this.userForm = this.formBuilder.group({
      name : new FormControl(user.name, [Validators.required , Validators.pattern('[a-zA-Z]+')]),
      email: new FormControl(user.email, [Validators.required, Validators.email]),
      role: new FormControl(user.role, [Validators.required]),
      status: new FormControl(user.status, [Validators.required]),
      img: new FormControl(user.img, [Validators.required]),
      creationDate: new FormControl(user.creationDate),
    })
    this.editable = true;
    this.userId = user.$key;
  }

  cancle(){
    this.editable = false;
    this.userId = '';
  }

  onSubmit(newUserValue){
    this.submitted = true;
    if(this.userForm.valid){
    this.usersService.GetUser(this.userId);
    this.usersService.UpdateUser(newUserValue);
    this.editable = false;
    }
  }

}
