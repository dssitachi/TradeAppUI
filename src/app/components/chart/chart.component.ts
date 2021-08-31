import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockServiceService } from 'src/app/services/stock-service.service';
import { createChart } from 'lightweight-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  hiLowData: any = {};
  chardata: any[] = [];
  // chart = createChart('divChart', {
  //   width: 600,
  //   height: 300,
  //   layout: {
  //     backgroundColor: '#000000',
  //     textColor: 'rgba(255, 255, 255, 0.9)',
  //   },
  //   grid: {
  //     vertLines: {
  //       color: 'rgba(197, 203, 206, 0.5)',
  //     },
  //     horzLines: {
  //       color: 'rgba(197, 203, 206, 0.5)',
  //     },
  //   },
  //   rightPriceScale: {
  //     borderColor: 'rgba(197, 203, 206, 0.8)',
  //   },
  //   timeScale: {
  //     borderColor: 'rgba(197, 203, 206, 0.8)',
  //   },
  // });

  // candleSeries = this.chart.addCandlestickSeries({
  //   upColor: 'rgba(255, 144, 0, 1)',
  //   downColor: '#000',
  //   borderDownColor: 'rgba(255, 144, 0, 1)',
  //   borderUpColor: 'rgba(255, 144, 0, 1)',
  //   wickDownColor: 'rgba(255, 144, 0, 1)',
  //   wickUpColor: 'rgba(255, 144, 0, 1)',
  // });

  constructor(private _service : StockServiceService, private _activatedRoute: ActivatedRoute) { }

  async ngOnInit() {
    let stockName: string = "";
    stockName = (this._activatedRoute.snapshot.paramMap.get("stockTicker"))!;
    console.log(`I am inside oninit ${stockName}`);
    let df = (await this._service.getHiloSeriesChart(stockName).toPromise())
    
    this.hiLowData = df["Monthly Time Series"];
    console.log("hilow data")
    console.log(this.hiLowData);
    let c: string[] = Object.keys(this.hiLowData);
    // console.log("value of c")
    // console.log(c);
    c.forEach(a => {
      console.log("I am in loop")
      let b: any = {};
      b["time"] = a;
      b["open"] = this.hiLowData[a]["1. open"];
      b["high"] = this.hiLowData[a]["2. high"];
      b["low"] = this.hiLowData[a]["3. low"];
      b["close"] = this.hiLowData[a]["4. close"];
      this.chardata.unshift(b);
    })
    console.log("Chardata is here")
    console.log(this.chardata);

    let chart = createChart('divChart', {
      width: 400,
      height: 300,
      layout: {
        backgroundColor: '#ffffff',
        textColor: 'rgba(0, 0, 255, 0.5)',
      },
      grid: {
        vertLines: {
          color: 'rgba(197, 203, 206, 0.5)',
        },
        horzLines: {
          color: 'rgba(197, 203, 206, 0.5)',
        },
      },
      rightPriceScale: {
        borderColor: 'rgba(197, 203, 206, 0.8)',
      },
      timeScale: {
        borderColor: 'rgba(197, 203, 206, 0.8)',
      },
    });
  
    let candleSeries = chart.addCandlestickSeries({
      priceLineColor:'rgba(0,0,255, 1)',
      
      upColor: 'rgba(0, 255, 0, 1)',
      downColor: 'rgba(255, 0, 0, 1)',
      borderDownColor: 'rgba(255, 144, 0, 1)',
      borderUpColor: 'rgba(255, 144, 0, 1)',
      wickDownColor: 'rgba(255, 144, 0, 1)',
      wickUpColor: 'rgba(255, 144, 0, 1)',
    });

    candleSeries.setData(this.chardata);
  }

}

