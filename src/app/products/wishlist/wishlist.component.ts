import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{

  allproducts:any=[]
  constructor(private api:ApiService, private toaster:ToasterService){}

  ngOnInit(): void {
    this.api.getwishlist().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.allproducts = res
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }

  // removeItem
  removeItem(id:any){
    // make service call
    this.api.removewlistitem(id).subscribe({
      next:(result:any)=>{
        this.allproducts = result
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }

   // addtocart
   addtocart(product:any){
    // make call to service
    this.api.addtocart(product).subscribe({
      next:(result:any)=>{
        // get cart count
        this.api.getCartCount()
        // remove item from wishlist
        this.removeItem(product.id)
        // alert result
        this.toaster.showSuccess(result,'Success')
      },
      error:(err:any)=>{
       console.log(err);
      }
    })
  }

}
