import { Injectable } from '@angular/core';

import { Client} from '../components/clients/client';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';

import {Observable,of, throwError} from 'rxjs';

import swal from 'sweetalert2';

import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private urlEndPoint:string= 'http://localhost:8080/api/clientes';
  constructor(private http: HttpClient,
              private router: Router){}
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  getClients(): Observable<Client[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map( response => response as Client[] )
    );
  }

  create(client: Client): Observable<Client>{
    return this.http.post(this.urlEndPoint, client, {headers:this.httpHeaders}).pipe(
      map( (response:any) => response.cliente as Client),
      catchError( e =>{
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  getClient(id:number): Observable<Client>{
    return this.http.get<Client>(`${this.urlEndPoint}/${id}`,{headers: this.httpHeaders}).pipe(
      catchError(e => {
        this.router.navigate(['/clients']);
        console.error(e.error.mensaje)
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  updateClient(client:  Client): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${client.id}`, client, {headers: this.httpHeaders}).pipe(
      catchError( e =>{
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );;
  }

  deleteClient(id: number): Observable<Client>{
    return this.http.delete<Client>(`${this.urlEndPoint}/${id}`,{headers:this.httpHeaders}).pipe(
      catchError( e =>{
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );;
  }

}
