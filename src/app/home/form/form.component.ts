import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AbstractControl, FormControl} from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, UsersService } from "../../users.service";
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent{

  constructor(private formBuilder: FormBuilder , private usersService:UsersService,private storage: AngularFireStorage) { }
  userForm: FormGroup;
  submitted = false;
  imgSrc;
  selectedImage :any = null;

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
        let filePath = `avatars/${this.selectedImage.name}_${new Date().getTime()}`//to make it uniqe
        const fileRef = this.storage.ref(filePath);
        this.storage.upload(filePath,this.selectedImage).snapshotChanges().pipe(
          finalize(()=>{
            fileRef.getDownloadURL().subscribe((url)=> {
              this.userForm.value['img'] = url;
              console.log('test1');
              this.addUser(this.userForm.value);
              this.resetForm();
              console.log('test2');
            })
          })
        ).subscribe()
    }
  }

  resetForm(){
    this.userForm.reset();
    this.userForm.setValue({
      name: '',
      email: '',
      role: '',
      status: '',
      img: '',
    });
    this.imgSrc = '';
    this.submitted = false;
    this.selectedImage = null;
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
      this.imgSrc = '';
      this.selectedImage = null;
			return;
		}
		
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			return;
		}

		var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    this.selectedImage = event.target.files[0];
		reader.onload = (_event) => {
			this.imgSrc = reader.result; 
		}
	}
}