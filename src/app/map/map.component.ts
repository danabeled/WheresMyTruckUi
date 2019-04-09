import { Component, OnInit } from '@angular/core';
import { FoodTruck } from '../foodtruck'
import { TRUCKS } from '../mock-trucks'
import { ClusterStyle } from '@agm/js-marker-clusterer/services/google-clusterer-types';
import { google } from '@agm/core/services/google-maps-types';
import { ActiveTruckService } from 'src/services/active-truck.service';
import { Router, ActivatedRoute } from '@angular/router';
import { load } from '@angular/core/src/render3/instructions';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

    //Lat / Long default to Stuart Street MA if access denied
    lat: number = 42.348373;
    lng: number = -71.076190;
    zoom: number = 16;
  
    map: any;
    searchBox: any;
    sub: any;
    mapLng: number = -71.076190;
    mapLat: number = 42.348373;
    markerCluster: any;

    mapReady(event: any) {
        this.map = event;
        const refreshTrucksButton = document.getElementById('Refresh-Trucks-Button');
        const moveButton = document.getElementById('Move-You-Button');
        const truckInput = document.getElementById('new-truck-input');
        const reportButton = document.getElementById('Report-Button');
        //3, top right
        //4, center left
        //5, top left
        this.map.controls[3].push(refreshTrucksButton);
        this.map.controls[5].push(moveButton);
        this.map.controls[10].push(truckInput);
        this.map.controls[10].push(reportButton);
    }

    clusterStyles: ClusterStyle[] =  [
    {
        textColor: "#FFFFFF",
        url:"assets/images/cluster1.png",
        height: 53,
        width: 52
    }];

    moveYou(){
        this.lat = this.map.getCenter().lat();
        this.lng = this.map.getCenter().lng();
    }

    trucks: Array<FoodTruck> = new Array<FoodTruck>();

    newTruck: FoodTruck = new FoodTruck("", 0, 0);
    trucksVoted: Array<string> = new Array<string>();
  
    constructor(private ActiveTruckService: ActiveTruckService,
                private route: ActivatedRoute) { }

    reportTruck(){
      this.newTruck.lat = this.lat;
      this.newTruck.lon = 0 - this.lng;
      this.ActiveTruckService.reportNewTruck(this.newTruck);
      this.newTruck.lon = this.lng;
      this.trucks.push(this.newTruck);
    }
  
    reportHere(truck: FoodTruck){
        this.ActiveTruckService.reportHere(truck);
        this.handleReport(truck);
        truck.reportHere();
    }

    
    reportNotHere(truck: FoodTruck){
        this.ActiveTruckService.reportNotHere(truck);
        this.handleReport(truck);
        truck.reportNotHere();

    }

    handleReport(truck: FoodTruck){
        this.trucksVoted.push(truck.name);
        window.localStorage.setItem("trucksVoted", JSON.stringify(this.trucksVoted));
    }


    truckIsVoted(truck: FoodTruck){
        if(this.trucksVoted == null)
            return false;
        for(let i = 0; i < this.trucksVoted.length; i++){
            if(truck.name == this.trucksVoted[i])
                return true;
        }
        return false;
    }


    loadTrucks(){
        this.trucks = this.ActiveTruckService.getTrucks();
        this.trucks = this.ActiveTruckService.getTruckCounts(this.trucks);
        
    }

    ngOnInit() { 

        var date = new Date();

        var lastaccess = +window.localStorage.getItem("lastaccess");
        console.log(lastaccess - (date.getDate() + date.getMonth() + date.getFullYear()))
        if(lastaccess - (date.getDate() + date.getMonth() + date.getFullYear()) != 0) {
            window.localStorage.removeItem("trucksVoted");
        }
        window.localStorage.setItem("lastaccess", "" + (date.getDate() + date.getMonth() + date.getFullYear()));
        console.log(date.getDate() + date.getMonth() + date.getFullYear());
        this.trucksVoted = JSON.parse(window.localStorage.getItem("trucksVoted"));

        if(this.trucksVoted == null) this.trucksVoted = new Array<string>();
        this.loadTrucks();
        console.log(this.trucks);
      
        this.sub = 
        this.route.params.subscribe(params => {
            console.log(params['latlon'])
            if(params['latlon'] != undefined){
                let latLon: string = params['latlon'];
                let splitLatLon = latLon.split(',');
                this.mapLat = +splitLatLon[0] - 0;
                this.mapLng = +splitLatLon[1];
                
                console.log(this.mapLat);
                console.log(this.mapLng);
                console.log(latLon);
                console.log(latLon.split(','));
            }
                
        if (window.navigator && window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(
                position => {
                    this.lat = position.coords.latitude;
                    this.lng = position.coords.longitude;
                    if(params['latlon'] == undefined){
                        this.mapLat = position.coords.latitude;
                        this.mapLng = position.coords.longitude;
                    }
                },
                error => {
                    switch (error.code) {
                        case 1:
                            console.log('Permission Denied');
                            break;
                        case 2:
                            console.log('Position Unavailable');
                            break;
                        case 3:
                            console.log('Timeout');
                            break;
                    }
                    
                })};
            
        });

    }

}
