import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockServiceService } from 'src/app/services/stock-service.service';
import Order from '../../models/Order';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  price:number = 0;
  order: Order = new Order();
  total:number = 0;
  tLow:number = 0;
  tHigh:number = 0;
  FHigh:number = 0;
  FLow:number = 0;
  marketCap: number = 0;
  peRatio: number = 0;
  pbRatio: number = 0;
  shares: number = 0;
  bookValue: number = 0;
  dividendYield: number = 0;
  exchange: string = "";
  currency: string = "";
  errorMsg:string = "";
  constructor(private _activatedRoute: ActivatedRoute, private _service: StockServiceService) { }

  ngOnInit(): void {
    let stockTicker = this._activatedRoute.snapshot.paramMap.get("stockTicker");

    this._service.getCurrentStockPrice(stockTicker!).subscribe(
      data => {
        console.log(data);
        let lastRefreshed = data["Meta Data"]["3. Last Refreshed"];
        this.price = data["Time Series (1min)"][lastRefreshed]["1. open"];
        console.log(this.price)
      }
    )

    this._service.getCompanyOverview(stockTicker!).subscribe(
      data => {
        this.bookValue = data['BookValue']
        this.currency = data['Currency']
        this.dividendYield = data['DividendYield']
        this.exchange = data['Exchange']
        this.marketCap = data['MarketCapitalization']
        this.peRatio = data['PERatio']
        this.shares = data['SharesOutstanding']
        this.FHigh = data['52WeekHigh']
        this.FLow = data['52WeekLow']
      }
    )
  }

  
  onChange(e:any) {
    
    this.total = e * this.price;
  }

  buy() {
    this.order.buyOrSell = "buy";
    this.order.currentTime = "";
    this.order.userId = 1;
    this.order.price = this.price;
    this.order.statusCode = 0;
    
    this._service.addOrdertoRemote(this.order).subscribe(
      data => {
        console.log("success");
      }
    )
  }

  sell() {
    console.log("sell button clicked");
    this.order.buyOrSell = "sell";
    this.order.currentTime = "";
    this.order.userId = 1;
    this.order.price = this.price;
    this.order.statusCode = 0;
    
    this._service.addOrdertoRemote(this.order).subscribe(
      data => {
        console.log(data);
        if(data == 0) {
          this.errorMsg = "Not enough stocks available."
        }
      }
    )
  }
}
