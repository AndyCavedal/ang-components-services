import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { Product } from './models/product.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-component-services';
  imgParent = '';
  showImg = true;
 

  onLoaded(img: string) {
    console.log('Loaded Padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }
}
