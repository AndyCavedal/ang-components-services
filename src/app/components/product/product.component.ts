import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product: Product = {
    id: '',
    price: 0,
    image: '',
    description: '',
    title: '',
    category: ''
  };

  @Output() addedProduct = new EventEmitter<Product>();

  constructor () {  }

  ngOnInit(): void {
  }

  onAddToCart() {
    this.addedProduct.emit(this.product)
  }
}
