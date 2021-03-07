import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ConexionService } from '../servicios/conexion.service';

@Component({
  selector: 'app-subir-foto',
  templateUrl: './subir-foto.component.html',
  styleUrls: ['../styles_forms.css']
})
export class SubirFotoComponent implements OnInit {

  foto_cargada:any
  foto_b64:any
  albums:any;
  sesion:any
  verSeleccion :any
  opcionSeleccionado:any
  tipo_foto:any;
  constructor(private router: Router, private conexion: ConexionService) {
    
    if(localStorage.getItem("sesion") == null){
      this.router.navigate(['/Users/Login'])
    }
    this.sesion = JSON.parse(localStorage.getItem("sesion") +"")[0]
    this.obtener_albumes();
    localStorage.setItem("ruta_anterior","/Users/Fotos/Subir");
    this.foto_b64 = localStorage.getItem("imgb64");
    this.foto_cargada = localStorage.getItem("encabezado")  +","+  this.foto_b64;
    this.tipo_foto = localStorage.getItem("tipoimg");
    localStorage.removeItem("imgb64");
    localStorage.removeItem("encabezado");

  }
  obtener_albumes(){
    let alb = this.conexion.obtener_albumes_list({"user": this.sesion.codigo_usuario});
    alb.subscribe(res=>{
      if(res == null){
        alert("No hay albums")
      }else{
          console.log(res)
          this.albums = res
      }
    })
  }
  capturar(selected: string) {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.verSeleccion = selected;
    console.log(this.verSeleccion)
}

  ngOnInit(): void {
  }
  
  agregar_imagen(){
    this.router.navigate(["/Users/Fotos/Seleccionar"]) 
  }
  subir_foto(nombre:string){
    if(this.foto_b64 == null){
      alert("Por favor seleccione una foto.")
      return
    }
    if(this.verSeleccion == null || this.verSeleccion == 'Seleccione un Album'){
      alert("Por favor seleccione un Album.")
      return
      
    }
    if(nombre != ""){
      let crear_foto = this.conexion.crear_foto({"user":this.sesion.codigo_usuario, "album":this.verSeleccion, 
                                                "origen":"1", "nombreFoto":nombre, "tipo":this.tipo_foto, 
                                                "base64":this.foto_b64});
      crear_foto.subscribe(crear_f=>{
      if(JSON.parse(JSON.stringify(crear_f)).res == null){
      alert("Datos erroneos, porfavor intente de nuevo")
      }else{
      alert("Se creo correctamente la foto")
      this.router.navigate(['/Users/Fotos'])    
      }
      })

    }else{
      alert("No se puede subir la foto, Campo nombre vacio.")
    }
   
  }
}
