import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  searchKey = new BehaviorSubject("")
  cartCount = new BehaviorSubject(0)
  
  base_url="https://e-cart-back-end-server.onrender.com"
  constructor(private http:HttpClient) {
    this.getCartCount()
   }

  // get all products
  getallproducts(){
    // make an api call to server
    return this.http.get(`${this.base_url}/products/get-all-products`)
  }
  
  // view product
  viewProduct(id:any){
    // make an api call to localhost:3000
    return this.http.get(`${this.base_url}/products/view/${id}`)
  }

  // addtowishlist
  addTowishlist(product:any){
    const body={
      id:product.id,
      title:product.title,
      price:product.price,
      image:product.image
    }
    // make an api call wishlist/add-product
    return this.http.post(`${this.base_url}/wishlist/add-product`,body)
  }

  // GET WISHLIST
  getwishlist(){
    return this.http.get(`${this.base_url}/wishlist/all-products`)
  }

  // remove wishlist item
  removewlistitem(id:any){
    return this.http.delete(`${this.base_url}/wishlist/remove-item/${id}`)
  }

  // add to cart
  addtocart(product:any){
    // req body
    const body={
      id:product.id,
      title:product.title,
      price:product.price,
      image:product.image,
      quantity:1
    }
    // make an api call 
    return this.http.post(`${this.base_url}/cart/add-product`,body)

  }
  
  // GETCART
  getcart(){
    return this.http.get(`${this.base_url}/cart/all-products`)
  }

  // get cart count
  getCartCount(){
    this.getcart().subscribe({
      next:(result:any)=>{
        this.cartCount.next(result.length)
      }

    })
  }

  // removecartitem
  removecartitem(id:any){
    return this.http.delete(`${this.base_url}/cart/remove-item/${id}`)
  }

  // increment cart
  incrementcart(id:any){
    // api call
    return this.http.get(`${this.base_url}/cart/increment-item/${id}`)
  }

  // decrement cart
  decrementcart(id:any){
    // api call
    return this.http.get(`${this.base_url}/cart/decrement-item/${id}`)
  }

  // empty cart
  emptycart(){
    // api call
    return this.http.delete(`${this.base_url}/cart/empty`)
  }

}
