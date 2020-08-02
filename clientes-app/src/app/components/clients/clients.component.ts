import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Client } from './client';

import Swal from 'sweetalert2'

import { tap } from 'rxjs/operators';

import {ModalService} from '../../services/modal.service';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clientes: Client[];
  paginator: any;
  clientSelected: Client;

  constructor(private clienteService: ClientService,
    private modalService: ModalService,
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
          response => {
            this.clientes = response.content as Client[]
            this.paginator = response;
          }
        );
    }
    );
    this.modalService.notificarUpload.subscribe(client =>{
        this.clientes = this.clientes.map(clienteOriginal => {
        if(client.id == clienteOriginal.id){
          clienteOriginal.photo = client.photo;
        }
        return clienteOriginal;
      })
    })
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

  openModal(client: Client) {
    this.clientSelected = client;
    this.modalService.openModal();
  }
}
