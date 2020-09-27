import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'ed-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin:FormGroup = this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required],
  });

  constructor(private fb:FormBuilder,private router:Router) { }

  ngOnInit(): void {
   
  }

  submit(){
    if(this.formLogin.valid){
      console.log('submit', this.formLogin.value);
      this.ValidateLogin(this.formLogin.value)
    }
  }


  private ValidateLogin(user:User){

    if (user.username==='admin' && user.password==='admin') {
      this.router.navigate([''])
      
    }
  }



}
