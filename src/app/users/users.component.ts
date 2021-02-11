import { Component, OnInit } from '@angular/core';
import { User, UsersService } from '../users.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private usersService:UsersService,private modalService: NgbModal ){}
  users: User[];
  closeResult = '';
  showModal: boolean;
  selectedUser;
  show(user)
  {
    this.showModal = true; // Show-Hide Modal Check
    this.selectedUser = user;
  }
  //Bootstrap Modal Close event
  hide()
  {
    this.showModal = false;
  }
  
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
      // this.toastr.success(user.name + ' successfully deleted!'); // Alert message will show up when student successfully deleted.
  }
  updateUser(newuser){
    this.usersService.UpdateUser(newuser);
  }

  //functions for pupup
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
