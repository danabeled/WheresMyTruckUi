export class FoodTruck {
    id: number;
    name: string;
    lat: number;
    lon: number;
    Here: number;
    NotHere: number;
    
    constructor(inputName: string, inputLat: number, inputLong: number) { 
        this.name = inputName; 
        this.lat = inputLat;
        this.lon = inputLong;
        this.Here = 0;
        this.NotHere = 0;
    }

    setHere(here: number){
        this.Here = here;
    }

    setNotHere(notHere: number){
        this.NotHere = notHere;
    }
    
    reportHere(){
        this.Here = this.Here + 1;
    }

    reportNotHere(){
        this.NotHere = this.NotHere + 1;
    }
}