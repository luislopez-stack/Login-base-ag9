import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService {

  private url = 'https://identitytoolkit.googleapis.com/v1/';
  private apiKey = 'AIzaSyDwojMM_Kn2ZN31hc5VAFAR0io60L-qI58';
  userTokend: string;

  //INICO SESION
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  //CREAR NUEVOS USUARIOS
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]


  constructor( private http : HttpClient ) {
    this.leerTokend();
  }


  login( usuario : UsuarioModel ){

    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post( `${ this.url }accounts:signInWithPassword?key=${ this.apiKey}`, authData)
    .pipe(
      map( resp => {
        this.guardarTokend( resp['idToken']);
        return resp;
      })
    );

  }


  logout(){
    localStorage.removeItem('token');
  }


  singup( usuario :UsuarioModel ){

    const authData = {
      email: usuario.email,
      password: usuario.password,
    };

    return this.http.post( `${ this.url }accounts:signUp?key=${ this.apiKey }`, authData )
    .pipe(
      map( resp => {
        this.guardarTokend( resp['idToken'] );
        return resp;
      })
    );

    //TAMBIEN SE USA LA SIG SINTAXIS
    //const authData = {
    //  ...usuario,
    //  returnSecureToken: true
    //};

  }


  private guardarTokend( idTokend: string){

    this.userTokend = idTokend;
    localStorage.setItem('token', idTokend);

    //Guardar hora/fecha del tokend
    let hoy = new Date();
    hoy.setSeconds(3600);
    localStorage.setItem('expira', hoy.getTime().toString());
  }

  leerTokend(){

    if(localStorage.getItem('token')){
      this.userTokend = localStorage.getItem('token');
    }else{
      this.userTokend='';
    }

    return this.userTokend;
  }

  isAutenticate(): boolean{

    if(this.userTokend.length < 2){
      return false;
    }

    const expiraNumber = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expiraNumber);

    if( expiraDate > new Date() ){
      return true
    }else{
      return false
    }

  }
}
