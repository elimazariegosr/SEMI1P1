import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-seleccionar-foto',
  templateUrl: './seleccionar-foto.component.html',
  styleUrls: ['../styles_forms.css']
})
export class SeleccionarFotoComponent implements OnInit {

  foto_perfil = ""
  constructor(private router: Router) { 
     
    if(localStorage.getItem("encabezado") != null && localStorage.getItem("imgb64") != null){
      this.foto_perfil = localStorage.getItem("encabezado") +"," +  localStorage.getItem("imgb64");
      ;
    }
  }

  ngOnInit(): void {
  }
  onChange($vent: Event){
    let file;
    let lista = ($vent.target as HTMLInputElement).files
    if(lista != null){
      file = lista[0]
    }
    this.convertir_b64(file as File)
    const canv = document.getElementById("c_camara") as HTMLCanvasElement;
    if(canv != null){
      canv.style.display = "hidden";
    }
    const img = document.getElementById("imagen") as HTMLImageElement;
    if(img) img.style.display = "visible";
 
  } 
  mostrar_img(){
    const div_imagen  = document.getElementById('div_imagen');
    if(div_imagen) div_imagen.style.display = 'block';
    const div_camara  = document.getElementById('div_camara');
    if(div_camara) div_camara.style.display = 'none';
    
  }
  convertir_b64(archivo: File){
    const observable = new Observable((subscriber: Subscriber<any>)=>{
      
    this.leer_archivo(archivo, subscriber);
    });
    observable.subscribe((d)=>{
      let valores = (d+"").split(",")
      this.foto_perfil = d ;
      localStorage.setItem("encabezado", valores[0]);
      localStorage.setItem("imgb64", valores[1]);
      localStorage.setItem("tipoimg", valores[0].split("/")[1].split(";")[0]);
      
    })
  }

  leer_archivo(archivo: File, subscriber: Subscriber<any>){
      const frd = new   FileReader();
      frd.readAsDataURL(archivo);
      frd.onload=()=>{
        subscriber.next(frd.result);
        subscriber.complete()
      }
      frd.onerror=(error)=>{
        subscriber.error(error);
        subscriber.complete()
      }
  }
  ocultar_divtm(){
    const div  = document.getElementById('div_tomar_foto');
    if(div) div.style.display = 'none';  
  }
  
  mostrar(){
    const div  = document.getElementById('div_tomar_foto');
    if(div) div.style.display = 'block';
  }
    
  tomar_foto(){
    const div_camara  = document.getElementById('div_camara');
    if(div_camara) div_camara.style.display = 'block';
    const div_imagen  = document.getElementById('div_imagen');
    if(div_imagen) div_imagen.style.display = 'none';
    
  
    
    const video = document.getElementById("espejo") as HTMLVideoElement;
    const canv = document.getElementById("c_camara") as HTMLCanvasElement;
  

    let contex = null;
    if(canv != null){
      contex = canv.getContext('2d')
    } 
    if(contex != null){
      if(video != null){
        contex.drawImage(video, 0,0,300, 300)
          let img = canv.toDataURL("image/jpeg").split(",");
          localStorage.setItem("encabezado",img[0]);
          localStorage.setItem("imgb64",img[1]);
          localStorage.setItem("tipoimg", "jpeg");
       }
    }
    this.ocultar_divtm()
  }
  cargar_foto(){
      if(localStorage.getItem("ruta_anterior")){
        this.router.navigate([localStorage.getItem("ruta_anterior")])
      }
  }

}
