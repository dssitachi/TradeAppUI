import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Order from 'src/app/models/Order';
import { StockServiceService } from 'src/app/services/stock-service.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orderList: Order[] = [];

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router,
    private _ser : StockServiceService
    ) { }

  ngOnInit(): void {
    this._ser.getOrdersFromRemote().subscribe(
      data => {
        this.orderList = data;
      }
    )
  }

}
