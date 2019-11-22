import { Action, createReducer, on } from '@ngrx/store';

import { ProductsState, initialProductsState } from './products.state';
import * as ProductsActions from './products.actions';

const reducer = createReducer(
  initialProductsState,
  on(ProductsActions.getProducts, state => {
    console.log('GET_PRODUCTS action being handled!');
    return {
        ...state,
        loading: true
      };
    }),
  on(ProductsActions.getProductsSuccess, (state, { products }) => {
    console.log('GET_PRODUCTS_SUCCESS action being handled!');
    const data = [...products];
    return {
      ...state,
      data,
      loading: false,
      loaded: true,
      selectedProduct: null
    };
  }),
  on(ProductsActions.getProductsError,
    ProductsActions.getProductError,
    (state, { error }) => {
    console.log('GET_PRODUCTS/PRODUCT_ERROR action being handled!');
    return {
      ...state,
      loading: false,
      loaded: false,
      error
    };
  }),
  on(ProductsActions.getProduct, state => {
    console.log('GET_PRODUCT action being handled!');
    return {
      ...state,
      loading: true,
      loaded: false
    };
  }),
  on(ProductsActions.getProductSuccess, (state, { product }) => {
    console.log('GET_PRODUCT action being handled!');
    const selectedProduct = { ...product };
    return {
      ...state,
      loading: false,
      loaded: true,
      selectedProduct
    };
  }),
  on(ProductsActions.createProduct, state => {
    console.log('CREATE_PRODUCT action being handled!');
    return { ...state };
  }),
  on(ProductsActions.createProductSuccess, (state, { product }) => {
    console.log('CREATE_PRODUCT_SUCCESS action being handled!');
    const data = [...state.data, { ...product }];

    return {
      ...state,
      data
    };
  }),
  on(
    ProductsActions.createProductError,
    ProductsActions.updateProductError,
    ProductsActions.deleteProductError,
    (state, { error }) => {
      console.log('CREATE/UPDATE/DELETE_PRODUCT_ERROR action being handled!');
      return {
        ...state,
        error
      };
    }
  ),
  on(ProductsActions.updateProduct, state => {
    console.log('UPDATE_PRODUCT action being handled!');
    return { ...state };
  }),
  on(ProductsActions.updateProductSuccess, (state, { product }) => {
    console.log('UPDATE_PRODUCT_SUCCESS action being handled!');
    const data = [...state.data];

    const index = data.findIndex(t => t.id === product.id);

    data[index] = { ...product };

    return {
      ...state,
      data
    };
  }),
  on(ProductsActions.updateProductError, (state, { error }) => {
    console.log('UPDATE_PRODUCT_ERROR action being handled!');
    return {
      ...state,
      error
    };
  }),
  on(ProductsActions.deleteProduct, state => {
    console.log('DELETE_PRODUCT action being handled!');
    return { ...state };
  }),
  on(ProductsActions.deleteProductSuccess, (state, { product }) => {
    console.log('DELETE_PRODUCT_SUCCESS action being handled!');
    const data = state.data.filter(p => p.id !== product.id);

    return {
      ...state,
      data
    };
  }),
);

export function productsReducer(state: ProductsState | undefined, action: Action) {
  return reducer(state, action);
}
