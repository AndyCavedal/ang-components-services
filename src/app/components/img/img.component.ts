import { Component, Input, Output, EventEmitter, OnChanges, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @Input() img: string = 'valor init';
  @Output() loaded = new EventEmitter<string>();
  imageDefault: string = '../assets/default.png';
  // counter: number = 0;
  // counterFn: number | undefined;

  constructor() {
    // before render, solo una vez
    console.log('constructor', 'imgValue =>', this.img);
  }

  ngOnChanges() {
    //before render, cambios en inputs, se queda escuchando
    console.log('ngOnChanges', 'imgValue =>', this.img);
  }

  ngOnInit(): void {
    //before render, async - fetch, llamadas a API deberian ir aqui. Corre una vez.
    console.log('ngOnInit', 'imgValue =>', this.img);
    // this.counterFn = window.setInterval(() => {
    //   this.counter += 1;
    //   console.log('run counter');

    // }, 1000);
  }

  ngAfterViewInit(): void {
    //after render
    //maneja los hijos, si quisieramos manipuarlos o ejecutar eventos con ellos
    console.log('ngAfterViewInit')
  }

  ngOnDestroy(): void {
    //delete
    console.log('ngOnDestroy');
    // window.clearInterval(this.counterFn);
  }

  imgError() {
    this.img = this.imageDefault;
  }

  imgLoad() {
    console.log('Loaded Hijo');
    this.loaded.emit(this.img);
  }

}
