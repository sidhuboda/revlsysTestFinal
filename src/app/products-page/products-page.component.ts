import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


import { ProductService } from '../product.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {
  productdetails: any[] = [];
  sortTypeValue = '';
  sortTypelw = 'lowtohigh';
  sortTypehl = 'hightolow';

  private noOfItemsToShowInitially: number = 12;
  private itemsToLoad: number = 12;
  itemsToShow: any[];
  // itemsToLoad - number of new items to be displ
  isFullListDisplayed: boolean = false;
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute,
    private location: Location) {
    this.activatedRoute.queryParams.subscribe(data => {
      console.log(data);
      this.sortTypeValue = data.sortType;
      console.log(this.sortTypeValue);
    });
  }

  ngOnInit() {

    this.productService.getProduct().subscribe(data => this.productdetails = data);
    this.itemsToShow = this.productdetails.slice(0, this.noOfItemsToShowInitially);
    this.itemsToShow = this.itemsToShow.sort((low, high) => high.Price - low.Price);
    // tslint:disable-next-line: triple-equals
    if (this.sortTypeValue == this.sortTypelw) {
      console.log('low', this.sortTypeValue, this.sortTypelw);
      this.itemsToShow = this.itemsToShow.sort((low, high) => low.Price - high.Price);
    } else {
      this.itemsToShow = this.itemsToShow.sort((low, high) => high.Price - low.Price);
    }
  }

  sort(event: any) {
    switch (event.target.value) {
      case 'Low':
        {
          this.itemsToShow = this.itemsToShow.sort((low, high) => low.Price - high.Price);
          const cururl = this.location.path().replace(this.sortTypehl, this.sortTypelw);
          console.log(cururl);
          this.location.go(cururl);
          this.sortTypeValue = this.sortTypelw;
          console.log('LH', cururl, this.sortTypeValue, this.sortTypelw);
          break;
        }
      case 'High':
        {
          this.itemsToShow = this.itemsToShow.sort((low, high) => high.Price - low.Price);
          const cururl = this.location.path().replace(this.sortTypelw, this.sortTypehl);
          console.log(cururl);
          this.location.go(cururl);
          this.sortTypeValue = this.sortTypehl;
          console.log('HL', cururl, this.sortTypeValue, this.sortTypehl);
          break;
        }
      default: {
        this.itemsToShow = this.itemsToShow.sort((low, high) => high.Price - low.Price);
        break;
      }
    }
    return this.itemsToShow;
  }


  onScroll() {

    if (this.noOfItemsToShowInitially <= this.productdetails.length) {

      // Update ending position to select more items from the array
      this.noOfItemsToShowInitially += this.itemsToLoad;
      console.log(this.noOfItemsToShowInitially, "add", this.noOfItemsToShowInitially, "items");

      this.itemsToShow = this.productdetails.slice(0, this.noOfItemsToShowInitially);

    } else {
      this.isFullListDisplayed = true;
    }
  }
}
