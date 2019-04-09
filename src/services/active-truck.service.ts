import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { FoodTruck } from 'src/app/foodtruck';

@Injectable({
  providedIn: 'root'
})

  
export class ActiveTruckService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://35.168.54.90:8000'

  reportHere(truck: FoodTruck){
    let url: string = this.baseUrl +
    '/trucks/here';
    console.log(truck);
    let t = JSON.stringify(truck);
    this.http.post(url, t, this.httpOptions).subscribe((result: any) => {
      console.log(result)
    });
  }

  reportNewTruck(truck: FoodTruck){
    let url: string = this.baseUrl +
    '/trucks';
    let t = JSON.stringify(truck);
    this.http.post(url, t, this.httpOptions).subscribe((result: any) => {
      console.log(result)
    });
  }
  
  reportNotHere(truck: FoodTruck){
    let url: string = this.baseUrl +
    '/trucks/nothere';
    let t = JSON.stringify(truck);
    this.http.post(url, t, this.httpOptions).subscribe((result: any) => {
      console.log(result)
    });
  }
  
  getTruckCounts(trucks: Array<FoodTruck>): Array<FoodTruck>{
    let url: string =  this.baseUrl + `/truckAllCounts`;
    
    this.http.get(url).subscribe((result: any) =>
    {
      
      for(let i=0; i<result.length; i++){
        for(let j=0; j< trucks.length; j++){
          if(result[i].name == trucks[j].name){
            trucks[j].setHere(result[i].here);
            trucks[j].setNotHere(result[i].notHere);
          }
        }
      }
    });
    return trucks;
  }
  getTrucks(): Array<FoodTruck>{
    let trucks = new Array<FoodTruck>();
    let url: string =  this.baseUrl + `/trucks`;
    
    this.http.get(url).subscribe((result: any) =>
    {
        for(let i=0; i<result.length; i++){
          let offset = 0;
          for(let j=0; j< trucks.length; j++){
            while((result[i].lat - offset) == trucks[j].lat && (offset - result[i].lon) == (trucks[j].lon))
            {
              offset = offset + .00002
              j=0;
            }
          }
            var newTruck = new FoodTruck(result[i].name, result[i].lat - offset,
                offset - result[i].lon);

            trucks.push(newTruck);
            console.log(trucks);
        }
    });
    return trucks;
  }
}
