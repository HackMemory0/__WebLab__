import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {User} from "../../model/model.user";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {UserService} from "../../services/user.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  user: User=new User();
  errorMessage:string;
  constructor(private userService: UserService, private authService :AuthService, private tokenService: TokenStorageService, private router: Router) { }



  ngOnInit() {
  }

  login(){
    this.authService.login(this.user)
      .subscribe(data=>{
          this.tokenService.saveToken(data.token);
        this.userService.getCurrentProfile()
          .subscribe(data => console.log(data));
        },err=>{
          this.errorMessage="error :  Username or password is incorrect";
        }
      )
  }
}
