import { Injectable } from '@angular/core';

import { Client} from '../components/clients/client';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

import {Observable,of} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private urlEndPoint:string= 'http://localhost:8080/api/clientes';
  constructor(private http: HttpClient){}
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  getClients(): Observable<Client[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map( response => response as Client[] )
    );
  }

  create(client: Client): Observable<Client>{
    return this.http.post<Client>(this.urlEndPoint, client, {headers:this.httpHeaders});
  }

  getClient(id:number): Observable<Client>{
    return this.http.get<Client>(`${this.urlEndPoint}/${id}`,{headers: this.httpHeaders});
  }

  updateClient(client:  Client): Observable<Client>{
    return this.http.put<Client>(`${this.urlEndPoint}/${client.id}`, client, {headers: this.httpHeaders});
  }

  deleteClient(id: number): Observable<Client>{
    return this.http.delete<Client>(`${this.urlEndPoint}/${id}`,{headers:this.httpHeaders});
  }

}
