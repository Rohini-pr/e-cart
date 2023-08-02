import { Component, OnInit } from '@angular/core';
import { ApiService } from '../products/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cartItemsCount:number=0
  constructor(private api:ApiService){}
  
  ngOnInit(): void {
    this.api.cartCount.subscribe({
      next:(res:any)=>{
        this.cartItemsCount = res
        console.log(this.cartItemsCount);
        
      }
    })
  }

  //search
  search(event:any){
    const {value}=event.target
    this.api.searchKey.next(value)
  }
}
