import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatButtonModule, MatCheckboxModule, MatInputModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule,  } from '@angular/material';
import { FoodTruck } from '../foodtruck';
import { ActiveTruckService } from 'src/services/active-truck.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  constructor(private breakpointObserver: BreakpointObserver, 
              private ActiveTruckService: ActiveTruckService,
              private router: Router,) {}

  trucks: Array<FoodTruck> = new Array<FoodTruck>();
  filteredOptions: Observable<FoodTruck[]>;
  myControl = new FormControl();
  searchTruck: string;

  ngOnInit() {
    this.trucks = this.ActiveTruckService.getTrucks();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  
  private _filter(value: string): FoodTruck[] {
    const filterValue = value.toLowerCase();
    return this.trucks.filter(truck => truck.name.toLowerCase().includes(filterValue));
  }

  
  search() {
    console.log("Searched");
    for(let i=0; i < this.trucks.length; i++){
      if(this.searchTruck == this.trucks[i].name){
        console.log(this.trucks[i])
        
        this.router.navigate(['map', 'at', this.trucks[i].lat + "," + this.trucks[i].lon]);
      }
    }
   }
  
  onKey(event: any) {
    if(event.key == "Enter")
    {
      this.search();
    }
  }
}

