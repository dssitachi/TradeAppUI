import { Component, OnInit } from '@angular/core';
import Dashboard from 'src/app/models/Dashboard';
import { StockServiceService } from 'src/app/services/stock-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dashboard: Dashboard[] = [];
  constructor(private _serv : StockServiceService) { }

  ngOnInit(): void {
    this._serv.getDashboardFromRemote().subscribe(
      data => {
        this.dashboard = data;
      }
    )
  }
  

}
