import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthFirebaseService } from '../../services/auth-firebase.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  recordarUs = false;

  constructor(private auth : AuthFirebaseService, private router: Router ) { }

  ngOnInit(): void {


  }

  onSubmit(f: NgForm){

    if(f.invalid){ return;}

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Waith...'
    });
    Swal.showLoading();


    console.log('Formulario enviado');
    console.log(f);

    this.auth.singup( this.usuario ).subscribe( resp => {

      console.log(resp);
      Swal.close();
      if(this.recordarUs){
        localStorage.setItem('email', this.usuario.email);
      }
      this.router.navigateByUrl('/home');

    }, ( err ) => {

      console.log( err.error.error.message);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `'Something went wrong!' ${err.error.error.message} `,
      });
    });
  }




}
