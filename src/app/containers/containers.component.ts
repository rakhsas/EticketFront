import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.css']
})
export class ContainersComponent {
  title = 'eticket-front';
  //Sidebar toggle show hide function
  status: boolean = false;

  addToggle() {
    this.status = !this.status;
  }
}
