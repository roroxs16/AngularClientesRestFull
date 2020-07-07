import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styleUrls: ['./directiva.component.css']
})
export class DirectivaComponent implements OnInit {

  constructor() { }

    listCurso:String[] =["JavaScript", "Java", "C#", "Python"]
  ocultar:boolean=true;
  ngOnInit(): void {
  }


  setOcultar():void{
    this.ocultar = (this.ocultar==true)? false: true
  }
}
