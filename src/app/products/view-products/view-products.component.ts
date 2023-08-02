import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {

  product:any={}
  
  constructor(private viewRouter:ActivatedRoute , private api:ApiService ,private toaster:ToasterService){}
  ngOnInit(): void{
    this.viewRouter.params.subscribe({
      next:(result:any)=>{
        const {id} = result
        console.log(id);
        // using id make a call to service to get details of that product
        this.api.viewProduct(id).subscribe({
          next:(result)=>{
            console.log(result);
            this.product = result
          },
          error:(err:any)=>{
            console.log(err);
            
          }
        })
      }
    })
  }

  // addtowishlist
  addtowishlist(product:any){
    this.api.addTowishlist(product).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.toaster.showSuccess(`${res.title} added to your wishlist`,'Success')        
      },
      error:(err:any)=>{
        console.log(err.error);
        this.toaster.showWarning(err.error,'Fail')     
        
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
        // alert result
        this.toaster.showSuccess(result,'Success')
      },
      error:(err:any)=>{
       console.log(err);
      }
    })
  }

}
