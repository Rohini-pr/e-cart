import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toaster:ToastrService) { }

  showSuccess(message:any,title:any) {
    this.toaster.success(message, title);
  }
  showError(message:any,title:any) {
    this.toaster.error(message, title);
  }
  showWarning(message:any,title:any) {
    this.toaster.warning(message, title);
  }
}
