import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import {ElementRef,ViewChild } from '@angular/core';
import { Console } from 'console';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';
import { ConexionService } from '../servicios/conexion.service';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styleUrls: ['../styles_forms.css']
})

export class FotosComponent implements OnInit {
  albums = new Array;
  sesion:any
  constructor(private router: Router, 
    private conexion: ConexionService) {
      if(localStorage.getItem("sesion") == null){
        this.router.navigate(['/Users/Login'])
      }
      this.sesion = JSON.parse(localStorage.getItem("sesion") +"")[0]
      this.obtener_albumes();
  }

  ngOnInit(): void {
  }
  mostrar(url:string){
    const div  = document.getElementById('rep_ast');
    if(div) div.style.display = 'block';
    console.log(url);
    const div_image = document.getElementById('div_image');
    if(div_image) div_image.innerHTML = "<img src=" + url + " class=\"fadeIn second\"  style=\"max-height: 400px;\">"; 

  }
  ocultar(){
    const div  = document.getElementById('rep_ast');
    if(div) div.style.display = 'none';  
  }
  obtener_albumes(){
      let alb = this.conexion.obtener_albumes({"user": this.sesion.codigo_usuario});
      alb.subscribe(res=>{
        if(res == null){
          alert("No hay albums")
        }else{
          console.log(JSON.parse(JSON.stringify(res)));
          this.crear_albumes(JSON.parse(JSON.stringify(res)))
        }
      })
  }
  crear_albumes(res:any){
    
    for(let i in res){
        
        this.buscar_album(res[i].nombreA)[1].push([res[i].nombreF, res[i].url_fotop])
    }
    console.log(this.albums)
  }
  buscar_album(nombre: string){
      for(let i in this.albums){
        if((this.albums[i])[0] == nombre){
          return this.albums[i];
        }
      }
      this.albums.push([nombre, new Array])
      return this.albums[this.albums.length -1]
  }
}
