import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(allproducts: any[],searchKey:string,propertyName:string): any[] {
    const result : any=[]
    if(!allproducts || searchKey=="" || propertyName=="" ){
      return allproducts
    }
    allproducts.forEach((item:any)=>{
      if(item[propertyName].trim().toLowerCase().includes(searchKey.trim().toLowerCase())){
        result.push(item)
      }
    })
    return result;

  }

}
