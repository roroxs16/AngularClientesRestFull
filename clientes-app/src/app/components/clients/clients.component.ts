import { Component, OnInit } from '@angular/core';

import { Client } from './client';

import { ClientService } from '../../services/client.service';

import Swal from 'sweetalert2'

import { tap } from 'rxjs/operators';

import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clientes: Client[];
  paginator: any;
  constructor(private clienteService: ClientService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }

      this.clienteService.getClients(page)
        .pipe(
          tap(response => {
            //console.log('ClientesComponent: tap 3');
            (response.content as Client[]).forEach(client => {
              //console.log(client.name)
            })
          })
        )
        .subscribe(
          response =>{
            this.clientes = response.content as Client[]
            this.paginator = response;
          }
        );
    }
    );
  }

  deleteClient(client: Client): void {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Esta seguro que desea eliminar?',
      text: `¿Está seguro que desea eliminar a ${client.name} ${client.lastName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, elimnar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.clienteService.deleteClient(client.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== client);
            swalWithBootstrapButtons.fire(
              'Cliente Eliminado!',
              `Cliente ${client.name} ${client.lastName} eliminado con exito.`,
              'success'
            )
          }
        )

      }
    })
  }

}
