import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder } from '@angular/forms';
import { ToasterService } from 'src/app/services/toaster.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  closeModal:string=""
  paymentStatus:boolean=false
  showModelFooter:boolean=true
  showPaypal:boolean=false
  showSuccess:boolean=false
  showCancel:boolean=false
  showError:boolean=false
  public payPalConfig?: IPayPalConfig;

  couponClicked:boolean=false
  offerbtnclickstatus:boolean=false
  checkoutClickStatus:boolean=false
  totalCartAmout:number=0
  allproducts:any=[]
  username:any
  flat:any
  state:any
  pincode:any
  addressForm = this.fb.group({
    username:[''],
    flatno:[''],
    state:[''],
    pincode:['']
  })
  constructor(private api:ApiService , private fb:FormBuilder, private toaster:ToasterService){}

  ngOnInit(): void{
    this.getcart()
  }

  // get cart
  getcart(){
    this.api.getcart().subscribe({
      next:(result:any)=>{
        this.allproducts = result
        // get cart total price
        this.getcarttotalprice()
        // paypall call
        // this.initConfig()
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }

  // get cart total price
  getcarttotalprice(){
    let total = 0
    this.allproducts.forEach((item:any)=>{
      total+=item.total
      this.totalCartAmout=Math.ceil(total)
    })
  }

  // remove cart item
  removeitem(id:any){
    // make call to service
    this.api.removecartitem(id).subscribe({
      next:(res:any)=>{
        // update cart array
        this.allproducts = res
        // update cart total price
        this.getcarttotalprice()
        // update cart count
        this.api.getCartCount()
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  // increment cart item
  incrItem(id:any){
    // make call to service
    this.api.incrementcart(id).subscribe({
      next:(res:any)=>{
        this.allproducts = res
        //update total price
        this.getcarttotalprice()
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }

  // decrement cart item
  decrItem(id:any){
    // make call to service
    this.api.decrementcart(id).subscribe({
      next:(res:any)=>{
        this.allproducts = res
        //update total price
        this.getcarttotalprice()
        // update cart count
        this.api.getCartCount()
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }

  // empty cart
  emptycart(){
    // call to service
    this.api.emptycart().subscribe({
      next:(res:any)=>{
        this.allproducts=res
        // upadate cart total price = 0
        this.totalCartAmout = 0 
        // update cart count
        this.api.getCartCount()
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }

  // checkout
  checkout(){
    if(this.addressForm.valid){
      this.checkoutClickStatus=true
      this.username = this.addressForm.value.username
      this.flat = this.addressForm.value.flatno
      this.state = this.addressForm.value.state
      this.pincode = this.addressForm.value.pincode
    }
    else{
      this.toaster.showWarning("Invalid Form","Warning")
    }
  }

  // offerbtn clicked
  offerclick(){
    this.offerbtnclickstatus=true
  }

  // discount10 
  discount10(){
    this.couponClicked=true
    this.totalCartAmout -= Math.ceil(this.totalCartAmout*.1)
  }

  // discount50 
  discount50(){
    this.couponClicked=true
    this.totalCartAmout -= Math.ceil(this.totalCartAmout*.5)
  }

  // paypal method
  private initConfig(): void {
    // convert cart amount to string
    let amount = this.totalCartAmout.toString()
    
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: amount,
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: amount
                }
              }
            },
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details:any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        //payment completed
        this.showSuccess = true;
        // this.toaster.showSuccess("Payment completed successfully. Order has already placed. Thank You!!","Success")
        // empty cart
        this.emptycart() 
        // paypalhidden
        this.showPaypal=false
        this.showModelFooter=false
        this.paymentStatus=true
      
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        this.showCancel=true
        this.showModelFooter=false
        // paypalhidden
        this.showPaypal=false
        setTimeout(() => {
          this.showCancel=false
          this.showModelFooter=true
        }, 5000);
      },
      onError: err => {
        console.log('OnError', err);
        this.showError=true
        this.showModelFooter=false
        // paypalhidden
        this.showPaypal=false
        setTimeout(() => {
          this.showError=false
          this.showModelFooter=true
        }, 5000);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }

  // makepayment
  makepayment(){
    this.showPaypal=true
    this.initConfig()
  }

}
