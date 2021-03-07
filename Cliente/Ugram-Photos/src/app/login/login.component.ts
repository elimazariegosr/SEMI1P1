import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {ConexionService} from '../servicios/conexion.service';
import {Md5} from 'ts-md5/dist/md5';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../styles_forms.css'],
  providers: [ConexionService]
})
export class LoginComponent implements OnInit {


  constructor(private router: Router,
              private conexion: ConexionService) {
                if(localStorage.getItem("sesion") != null){
                  this.router.navigate(['/Users'])
                }          
    
  }

  ngOnInit(): void {
  }
  
  validar_login(usr:string, pass:string){
    if(usr == "" && pass == ""){
        alert("Campos vacios")
    }else{
    
      let sesion = this.conexion.buscar_usuario({"user" : usr});

      sesion.subscribe(resp=>{
        if(resp == null){
            this.router.navigate(['/Users/Login'])
            alert("Datos erroneos, porfavor intente de nuevo")
        }else{
          let val = JSON.stringify(resp);
          let s = JSON.parse(val +"")
      
          const md5 = new Md5();
          let encrip =md5.appendStr(pass).end();
    
          if(s[0].psw == encrip){
            localStorage.setItem("sesion", val);
            this.router.navigate(['/Users'])
          }else{
            this.router.navigate(['/Users/Login'])
            alert("Datos erroneos, porfavor intente de nuevo")
          }
        }
       })    
    }
  }
}
