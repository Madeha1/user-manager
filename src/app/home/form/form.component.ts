import { Component } from '@angular/core';
import { AbstractControl, FormControl} from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent{

  constructor(private formBuilder: FormBuilder) { }
  userForm: FormGroup;
  submitted = false;
  imageUrl;

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
    // stop here if form is invalid
    if (this.userForm.valid) {
        this.addUser(this.userForm.value);
        this.submitted = false;
        this.userForm.get('name').reset();
        this.userForm.get('email').reset();
        this.userForm.get('role').reset();
        this.userForm.get('status').reset();
        this.userForm.get('img').reset();
    }
  }
  //should be shared data
  users = [
    {
      'id':1,
      'name':'madeha',
      'img' : 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png',
      'email':'madehatahboub@gmail.com',
      'role': 'student',
      'status': 's',
      'creationDate': Date.parse('1-12-2021')
    }
  ];

  addUser(formValues :any){
    console.log(formValues);
    let name :string = formValues.name;
    let img : string = formValues.img;
    let email:string = formValues.email;
    let role : string = formValues.role;
    let status: string = formValues.status;
    this.users.push({
      'id': this.users.length,
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
		
		reader.onload = (_event) => {
			this.imageUrl = reader.result; 
		}
	}
}
