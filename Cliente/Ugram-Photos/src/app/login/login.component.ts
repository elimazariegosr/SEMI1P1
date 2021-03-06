import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {ConexionService} from '../servicios/conexion.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../styles_forms.css']
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
  session:any;
  
  validar_login(usr:String, pass:String){
    if(localStorage.getItem("sesion")){
      this.router.navigate(['/Users'])
     
    }  
    this.session = [
      { 
        "User":"user1",
        "Name":"Name1",
        "Imagen":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSotdgo9lpTKVEPXY2qcUpa0T0BW2jdwAiK2A&usqp=CAU",
        "Albums":"",
        "Password": "pass"
      }
    ]
    if(usr == "" && pass == ""){
        alert("Campos vacios")
    }else{
    
      let sesion = this.conexion.login({"user" : usr, "pass": pass});

      sesion.subscribe(resp=>{
        console.log(resp)
        if(resp == null){
            this.router.navigate(['/Users/Login'])
            alert("Datos erroneos, porfavor intente de nuevo")
        }else{
          localStorage.setItem("sesion", JSON.stringify(resp));
          this.router.navigate(['/Users'])
        }
       })    
    }
  }
}
