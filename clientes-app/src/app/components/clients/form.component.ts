import { Component, OnInit } from '@angular/core';
import { Client } from './client';
import { ClientService } from '../../services/client.service';
import {Router, ActivatedRoute} from '@angular/router';
import  swal  from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: []
})
export class FormComponent implements OnInit {

  public client: Client = new Client();
  public title: string = "Crear Cliente";

  public errores: string[];


  constructor(private clientService: ClientService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.loadClient()

  }

  loadClient(): void{
    this.activatedRoute.params.subscribe( params =>{
      let id = params['id']
      if(id){
        this.clientService.getClient(id).subscribe( (client) => this.client = client)

      }
    })

  }

  public create(): void{
    this.clientService.create(this.client).subscribe( cliente => {
        this.router.navigate(['/clients'])
        swal.fire('Nuevo Cliente',`El cliente ${cliente.name} ha sido creado con exito! `,'success')
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error(err.status);
        console.error(err.error.errors)
      }
    );
  }

  public  update():void{
    this.clientService.updateClient(this.client).subscribe (json =>{
      this.router.navigate(['/clients'])
      swal.fire('Cliente Actualizado', `${json.mensaje}: ${json.cliente.name}`, 'success')
    }
    ,
    err => {
      this.errores = err.error.errors as string[];

    })
  }
}
