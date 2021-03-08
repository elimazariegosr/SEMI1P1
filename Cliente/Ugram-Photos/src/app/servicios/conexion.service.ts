import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConexionService {
  url:any
  constructor(private http:HttpClient) { 
    this.url = "http://localhost:3000/";

  }
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  })

  login(data:any){
    return this.http.post(this.url + 'login', data)
  }
  crear_usuario(data:any){
    return this.http.post(this.url + 'crearUsuario', data)
  }
  buscar_usuario(data:any){
    return this.http.post(this.url +'buscarUsuario', data)
  }
  crear_foto(data:any){
    return this.http.post(this.url +'crearFoto', data)
  }
  crear_album(data:any){
    return this.http.post(this.url +'crearAlbum', data)
  }

  modificar_usuario(data:any){
    return this.http.post(this.url +'modificarUsuario', data)
  }
  obtener_albumes(data:any){
    return this.http.post(this.url +'buscarFotos', data)
  }
  obtener_albumes_list(data:any){
    return this.http.post(this.url +'buscarAlbum', data)
  }
  eliminar_album(data: any){
    return this.http.post(this.url +'eliminarAlbum', data)
  }
}
