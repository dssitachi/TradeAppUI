import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Order from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class StockServiceService {

  constructor(private _httpClient : HttpClient) { }

  getStocks(searchString: string):Observable<any> {
    return this._httpClient.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchString}&apikey=CWE5IVKHG50JFLJT`);
  }

  getHiloSeriesChart(stockName: string) {
    return this._httpClient.get <any>(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${stockName}&apikey=CWE5IVKHG50JFLJT`);
  }
  
  getCurrentStockPrice(stockTicker:string): Observable<any> {
    return this._httpClient.get<any>(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockTicker}&interval=1min&apikey=CWE5IVKHG50JFLJT`);
  }

  addOrdertoRemote(order: Order): Observable<any> {
    return this._httpClient.post<any>(`https://localhost:8080/orders`, order);
  }

  getOrdersFromRemote(): Observable<any> {
    return this._httpClient.get <any>(`http://localhost:8080/api/orders/`);
  }

  getCompanyOverview(stockTicker: string): Observable<any> {
    return this._httpClient.get <any>(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stockTicker}&apikey=7XPL98KX02D37ESG`)
  }

  getDashboardFromRemote():Observable<any> {
    return this._httpClient.get <any>(`https://localhost:8080/api/dashboard`);
  }

}

//https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tesco&apikey=CWE5IVKHG50JFLJT