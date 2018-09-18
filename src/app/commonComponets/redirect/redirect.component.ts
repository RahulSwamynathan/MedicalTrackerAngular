import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {

  constructor(private _router: Router) { 
    
  }

  ngOnInit() {
    setTimeout(() => {
      this._router.navigate(['/Layout/login']);
    }, 3000);
  }
}
