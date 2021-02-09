import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AbstractControl, FormControl} from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, UsersService } from "../../users.service";
import { AngularFireStorage } from '@angular/fire/storage';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent{

  constructor(private formBuilder: FormBuilder , private usersService:UsersService,private storage: AngularFirestore) { }
  userForm: FormGroup;
  submitted = false;
  selectedImage;
  readerImage;

  get f() { return this.userForm.controls;}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
    name : new FormControl('', [Validators.required , Validators.pattern('[a-zA-Z]+')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    img: new FormControl('', [Validators.required]),
    })
  }

  onSubmit(){
    this.submitted = true;
    this.uploadImage();
    // stop here if form is invalid
    if (this.userForm.valid) {
        this.addUser(this.userForm.value);
        this.submitted = false;
        this.userForm.get('name').reset();
        this.userForm.get('email').reset();
        this.userForm.get('role').reset();
        this.userForm.get('status').reset();
        this.userForm.get('img').reset();
        this.selectedImage = '';
    }
  }
  
  uploadImage(){
    // let storageRef = firebase.storage().ref();

  }

  addUser(formValues :any){
    let name :string = formValues.name;
    let img : string = formValues.img;
    let email:string = formValues.email;
    let role : string = formValues.role;
    let status: string = formValues.status;

    this.usersService.AddUser({
      $key: 1, 
      'name': name,
      'img' : img,
      'email': email,
      'role': role,
      'status': status,
      'creationDate': Date.now()
    });
  }

  selectFile(event) {
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			return;
		}
		
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			return;
		}
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		this.readerImage = event.target.files[0];
		reader.onload = (_event) => {
			this.selectedImage = reader.result; 
		}
	}
}