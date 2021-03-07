import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timingSafeEqual } from 'crypto';
import {Md5} from 'ts-md5/dist/md5';
import { ConexionService } from '../servicios/conexion.service';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styleUrls: ['../styles_forms.css']
})
export class ModificarUsuarioComponent implements OnInit {

  sesion: any;
  foto_perfil:any
  foto_b64:any
  tipo_foto:any;
  
  constructor(private router: Router,
    private conexion: ConexionService) {
    if(localStorage.getItem("sesion") == null){
      this.router.navigate(['/Users/Login'])
    }
    this.sesion = JSON.parse(localStorage.getItem("sesion") +"")[0]
    
    if(localStorage.getItem("encabezado") != null && localStorage.getItem("imgb64") != null){
      this.foto_b64 = localStorage.getItem("imgb64");
      this.foto_perfil = localStorage.getItem("encabezado") +"," +  this.foto_b64;
    }else{
      this.foto_perfil = this.sesion.url_fotop;
    } 
    this.tipo_foto = localStorage.getItem("tipoimg");
    localStorage.setItem("ruta_anterior","/Users/Edit");
    localStorage.removeItem("imgb64");
    localStorage.removeItem("encabezado");
  }

  ngOnInit(): void {
  }

  agregar_imagen(){
    this.router.navigate(["/Users/Fotos/Seleccionar"]) 
  }
  modificar(usr:string, nombre:string, psw:string, nfoto:string){
      if(usr == "")usr = this.sesion.user
      let es_usr = this.conexion.buscar_usuario({"user": this.sesion.codigo_usuario});
      es_usr.subscribe(res=>{
        if(res == null){
          alert("Datos erroneos, porfavor intente de nuevo")
        }else{
          console.log("Se encontro")
          const md5 = new Md5();
          let encrip =md5.appendStr(psw).end();
          let crear_foto = this.conexion.crear_foto({"user":this.sesion.codigo_usuario, "album":"Fotos_Perfil", 
                                              "origen":"0", "nombreFoto":nfoto, "tipo":this.tipo_foto, 
                                              "base64":this.foto_b64});
    
          if(JSON.parse(JSON.stringify(res))[0].psw == encrip){
            localStorage.setItem("sesion", JSON.stringify(res));
            if(this.foto_b64 != null){
              crear_foto.subscribe(crear_f=>{
                if(JSON.parse(JSON.stringify(crear_f)).res == null){
                  alert("Datos erroneos, porfavor intente de nuevo")
                }else{
                  let url = JSON.parse(JSON.stringify(crear_f)).res;
                  let modificar_u = this.conexion.modificar_usuario({"user":this.sesion.codigo_usuario, 
                                                    "userNew":usr, "nombre": nombre, "url":url})  
      
                      modificar_u.subscribe(update_u => {
                        if(JSON.parse(JSON.stringify(update_u)).res == null){
                          alert("Datos erroneos, porfavor intente de nuevo")
               
                        }else{
                          alert("Se actualizo correctamente")
                          this.actualizar_session(usr)
                        }
                      })                                                                       
                 
                }
              })
            }else{
              let modificar_u = this.conexion.modificar_usuario({"user":this.sesion.codigo_usuario, 
                                                    "userNew":usr, "nombre": nombre, 
                                                    "url":JSON.parse(JSON.stringify(res))[0].url_fotop})  
      
                      modificar_u.subscribe(update_u => {
                        if(JSON.parse(JSON.stringify(update_u)).res == null){
                          alert("Datos erroneos, porfavor intente de nuevo")
               
                        }else{
                          alert("Se actualizo correctamente")
                          this.actualizar_session(usr)
                        }
                      })                                                                       
                 
                
            }
            
          }else{
            this.router.navigate(['/Users/Login'])
            alert("Datos erroneos, porfavor intente de nuevo")
          }
        }
      })
  }
  actualizar_session(usr:string){
    let sesion = this.conexion.buscar_usuario({"user" : usr});

      sesion.subscribe(resp=>{
        let val = JSON.stringify(resp);
        localStorage.setItem("sesion", val);
        this.router.navigate(['/Users'])
        
      })
      
          
  }
}
