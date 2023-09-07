import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { caisseService } from 'src/app/services/caisse.service';
import { dashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent {
  temperature: string;
  data: any;
  targetDateTime: string;
  caisses: Observable<any>;
  totalCaisses: number;
  totalAbonnement: number;

  constructor(private dashboardService: dashboardService,
    private caisseService: caisseService) {}

  ngOnInit(): void {
    this.targetDateTime = new Date().toISOString();
    this.dashboardService.getData().subscribe(
      (data: any) => {
        const hourly: string[] = data.hourly.time;
        const closestHour = hourly.reduce((prevHour, currentHour) => {
          if (currentHour <= this.targetDateTime) {
            return currentHour;
          }
          return prevHour;
        }, hourly[0]);
        const index = hourly.indexOf(closestHour);
        const targetTemperature = data.hourly.temperature_2m[index];
        this.temperature = `${targetTemperature}°C`;

      },
      (error) => {
        console.error('Error fetching data from the API', error);
      }
    );
    this.caisseService.getCaisses().subscribe(
      data => {
        this.caisses = data;
        this.totalCaisses = data.length;
      }
    )
    this.dashboardService.getAbonnements().subscribe(
      items => {
        this.totalAbonnement = items.length
      }
    )
  }
}

