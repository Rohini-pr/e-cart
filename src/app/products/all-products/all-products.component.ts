import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  allproducts:any=[]
  searchKey:string=""
  constructor(private api:ApiService, private toaster:ToasterService){}

    ngOnInit(): void{
      this.api.getallproducts().subscribe({
        next:(res:any)=>{
          console.log(res);
          this.allproducts = res
        },
        error:(err:any)=>{
          console.log(err);
        }

      })

      // get search key
      this.api.searchKey.subscribe({
        next:(key:any)=>{
          this.searchKey = key
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


