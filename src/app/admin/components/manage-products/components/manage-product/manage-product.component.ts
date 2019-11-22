// @NgRx
import { Store, select } from '@ngrx/store';
import { AppState, ProductsState } from './../../../../../core/@ngrx';
import * as ProductsActions from './../../../../../core/@ngrx/products/products.actions';


import { Component, OnInit, Input } from '@angular/core';
import { ProductModel, Product } from 'src/app/products/models/product.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { switchMap, pluck } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent implements OnInit {
  product: ProductModel;
  isNew: boolean;

  constructor(
    private store: Store<AppState>,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.pipe(pluck('product')).subscribe((product: ProductModel) => {
      this.product = { ...product };
      this.isNew = !!this.product.id;
    });
  }

  onSaveProduct(): void {
    // this.productService.editProducts(this.product).subscribe(() => this.onGoBack());
    const product = { ...this.product } as Product;
    this.store.dispatch(ProductsActions.updateProduct({ product }));
  }

  onAddProduct(): void {
    const product = { ...this.product } as Product;
    this.store.dispatch(ProductsActions.createProduct({ product }));
    // this.productService.addProducts(this.product).subscribe(() => this.onGoBack());
  }

  onGoBack(): void {
    this.router.navigate(['/admin/products']);
  }
}
