import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { FoodTruck } from 'src/app/foodtruck';
import { environment } from 'src/environments/environment';

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

  baseUrl: string = environment.url + '/api';

  reportHere(truck: FoodTruck){
    let url: string = this.baseUrl +
    '/report/here';
    console.log(truck);
    let t = JSON.stringify(truck);
    this.http.post(url, t, this.httpOptions).subscribe((result: any) => {
      console.log(result)
    });
  }

  reportNewTruck(truck: FoodTruck){
    let url: string = this.baseUrl +
    '/trucks/new';
    let t = JSON.stringify(truck);
    this.http.post(url, t, this.httpOptions).subscribe((result: any) => {
      console.log(result)
    });
  }
  
  reportNotHere(truck: FoodTruck){
    let url: string = this.baseUrl +
    '/report/nothere';
    let t = JSON.stringify(truck);
    this.http.post(url, t, this.httpOptions).subscribe((result: any) => {
      console.log(result)
    });
  }
  
  getTruckCounts(trucks: Array<FoodTruck>): Array<FoodTruck>{
    let url: string =  this.baseUrl + `/trucks/all`;
    
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
    let url: string =  this.baseUrl + `/trucks/all`;
    
    this.http.get(url).subscribe((result: any) =>
    {
        for(let i=0; i<result.length; i++){
          let offset = 0;
          for(let j=0; j< trucks.length; j++){
            while((result[i].loc.coordinates[1] - offset) == trucks[j].lat && (offset - result[i].loc.coordinates[0]) == (0 - trucks[j].lon))
            {
              offset = offset + .00002
              j=0;
            }
          }
            var newTruck = new FoodTruck(result[i].name, result[i].loc.coordinates[1] - offset,
                result[i].loc.coordinates[0] - offset);

            trucks.push(newTruck);
            console.log(trucks);
        }
    });
    return trucks;
  }
}
