import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private service: LoginService, private router: Router){}

  errormsg: any;
  successmsg: any;
  getParamId: any;

  userForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })

  userSubmit(){
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      this.service.login(this.userForm.value).subscribe((res) => {
        this.successmsg = 'Login Success!';
        this.errormsg = null;
        console.log(res, 'res==>');
        this.router.navigate(['dashboard']);
      })
      this.userForm.reset();
    } else {
      this.successmsg = null;
      this.errormsg = 'All field is required';
    }
  }

}
