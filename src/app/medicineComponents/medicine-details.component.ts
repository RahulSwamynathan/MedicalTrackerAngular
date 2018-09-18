import { Component, OnInit } from '@angular/core';
import { IMedicineDetails } from '../navigationComponents/Interfaces/imedicine-details';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NavigationService } from '../Services/navigation.service';
import { statusCodes } from '../global.variables';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine-details.component.html',
  styleUrls: ['./medicine-details.component.css']
})
export class MedicineDetailsComponent implements OnInit {

  medicineRequest: IMedicineDetails = {
    MedicineName: null,
    Price: null,
    ExpiryDate: null,
    Quantity: null
  }

  numberPattern: string = "^[0-9]*$";
  datePickerConfig: Partial<BsDatepickerConfig>;

  constructor(private _router: Router,
    private _service: NavigationService) {
    this.datePickerConfig = Object.assign({},
      {
        containerClass: "theme-dark-blue",
        minDate: new Date(Date.now()),
        maxDate: new Date(2030, 11, 31),
        showWeekNumbers: false
      });
  }

  ngOnInit() {
  }

  submitDetails(submitRequest: IMedicineDetails) {
    try {
      if (submitRequest.MedicineName != null && submitRequest.Price > 0 && submitRequest.Quantity > 0 && submitRequest.ExpiryDate != null) {
        this._service.insertMedicines(submitRequest).subscribe((res) => {
          if (res == statusCodes.Created) {
            this._router.navigate(['/requestLayout/allMedicine']);
          }
        }, (error) => console.log(error));
      }
    }
    catch (ex) {
      console.log(ex.message);
    }
  }

  cancelForm(formVal: NgForm) {
    formVal.form.reset();
  }
}
