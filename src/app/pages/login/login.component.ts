import { LowerCasePipe, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthFirebaseService } from '../../services/auth-firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  recordarUs = false;

  constructor( private auth : AuthFirebaseService, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('email')){
      this.usuario.email = localStorage.getItem('email');
      this.recordarUs = true;
    }
  }

  onSubmit( f : NgForm){

    if(f.invalid){return;}

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Waith...'
    });
    Swal.showLoading();

    console.log(f);
    this.auth.login( this.usuario )
    .subscribe( resp => {

      console.log( resp );
      Swal.close();
      if(this.recordarUs){
        localStorage.setItem('email', this.usuario.email);
      }
      this.router.navigateByUrl('/home');

    }, (err) => {

      console.log( err.error.error.message );
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `'Something went wrong!' ${err.error.error.message} `,
      });
    });
  }

}
