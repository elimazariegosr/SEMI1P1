import { Component, OnInit, Injectable, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { ConexionService } from '../servicios/conexion.service';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['../styles_forms.css']
})
export class RegistrarComponent implements OnInit {

  foto_perfil = "";
  foto_b64 :any;
  usr_creado :any;
  tipo_foto:any;
  constructor(private router: Router, private conexion: ConexionService) {
    if(localStorage.getItem("sesion") != null){
      this.router.navigate(['/Users'])
    }
    localStorage.setItem("ruta_anterior","/Users/Registrar");
    this.foto_b64 = localStorage.getItem("imgb64");

    this.foto_perfil = localStorage.getItem("encabezado") +"," +  this.foto_b64;
    this.tipo_foto = localStorage.getItem("tipoimg");
    localStorage.removeItem("imgb64");
    localStorage.removeItem("encabezado");

   }

  ngOnInit(): void {
  }

  registrar(usr:string, nombre:string, pass:string, passc:string){
    if(pass == passc){
      if(usr != "" && nombre != "" && pass != "" && this.foto_b64 != null ){

        const md5 = new Md5();
        let encrip =md5.appendStr(pass).end();
      
        let insert  = this.conexion.crear_usuario({"user": usr, "name": nombre,"pass": encrip});
        let crear_album = this.conexion.crear_album({"user":usr, "album":"Fotos_Perfil"});
        let crear_foto = this.conexion.crear_foto({"user":usr, "album":"Fotos_Perfil", 
                                                  "origen":"0", "nombreFoto":"Foto1", "tipo":this.tipo_foto, 
                                                  "base64":this.foto_b64});
        insert.subscribe(resp=>{
          if(resp == null){
              //this.router.navigate(['/Users/Registrar'])
              alert("El usuario insertado ya existe")
          }else{        
            crear_album.subscribe(crear_a =>{
              if(crear_a == null){
                alert("Datos erroneos, porfavor intente de nuevo")
              }else{
                crear_foto.subscribe(crear_f=>{
                  if(crear_f == null){
                    alert("Datos erroneos, porfavor intente de nuevo")
                  }else{
                    let url = JSON.parse(JSON.stringify(crear_f)).res;
                    let modificar_u = this.conexion.modificar_usuario({"user":usr, 
                                                      "userNew":usr, "nombre": nombre, "url":url})  
        
                        modificar_u.subscribe(update_u => {
                          if(update_u == null){
                            alert("Datos erroneos, porfavor intente de nuevo")
                  
                          }else{
                            this.router.navigate(['/Users/Login'])
                            alert("Se Creo correctamente el usuario")
                          }
                        })                                                                       
                      }
                    })
                  }
                })
              }
            })
      }else{
        alert("No se pudo crear el usuario. Verifique su informacion.")
                          
      }
    }else{
      alert("No se pudo crear el usuario. Las contrasenias no coinciden.")       
    }
  }
     
  agregar_imagen(){
    this.router.navigate(["/Users/Fotos/Seleccionar"]) 
  }
}
