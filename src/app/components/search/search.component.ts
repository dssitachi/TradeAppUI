import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockServiceService } from 'src/app/services/stock-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  options: [] = [];
  code: number = 0;
  searchString: string = "";
  constructor(private _router: Router, private _service: StockServiceService) { }

  ngOnInit(): void {
    //this.getVal(this.searchString);
    //this.getStocks(this.searchString);
  }

  getStocks(searchString: string) {
    if(this.searchString) {
      this._service.getStocks(searchString).subscribe(response => {
        this.options = response["bestMatches"];
        console.log(this.options);
      })
    }
  }

  getVal(event : KeyboardEvent) {
      console.log(this.searchString)
      if(event.key === "Backspace")
        this.getStocks(this.searchString);
      if(event.key.length > 1) return;
        this.code = event.key.charCodeAt(0);
      if((this.code > 47 && this.code < 58) || (this.code > 64 && this.code < 91) || (this.code > 96 && this.code < 123)) {
        this.searchString = (event.target as HTMLInputElement).value;
        //console.log(this.searchString);
        this.getStocks(this.searchString);
    }
  }

  getCompany(company: string) {
    this._router.navigate([`company/${company}`])
    console.log(company);
  }
}
