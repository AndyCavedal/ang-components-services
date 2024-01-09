import { Component, OnInit } from '@angular/core';
import { Product, CreateProductDTO, UpdateProductDTO } from '../../models/product.model';
import { StoreService } from '../../services/store.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
  showProductDetail = false;
  productChosen: Product  = {
    id: '',
    price: 0,
    images: [],
    description: '',
    title: '',
    category: {
      id: '',
      name: ''
    }
  };
  limit = 10;
  offset = 0;

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getProductsByPage(this.limit, this.offset)
    .subscribe(data => {
      this.products = data;
    })
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string) {
    this.productsService.getProduct(id)
    .subscribe (data => {
      this.toggleProductDetail();
      this.productChosen = data;
    })
  }

  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'Nuevo producto',
      price: 1000,
      description: 'Descripción creativa',
      images: ['https://example.com/image'],
      categoryId: 1,
    }
    this.productsService.create(product)
    .subscribe(data => {
      this.products.unshift(data);
    })
  }

  updateProduct() {
    const changes: UpdateProductDTO = {
      title: 'changed title',
    }
    const id = this.productChosen.id;
    this.productsService.update(id, changes)
    .subscribe(data => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id)
      this.products[productIndex] = data;
    })
  }

  deleteProduct() {
    const id = this.productChosen.id;
    this.productsService.delete(id)
    .subscribe(data => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id)
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    });
  }

  loadMore() {
    this.limit += 5;
    console.log(this.limit)
    this.ngOnInit()
  }
}
