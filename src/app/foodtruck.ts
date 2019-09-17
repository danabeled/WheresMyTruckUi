export class FoodTruck {
    id: number;
    name: string;
    lat: number;
    lon: number;
    here: number;
    notHere: number;
    
    constructor(inputName: string, inputLat: number, inputLong: number) { 
        this.name = inputName; 
        this.lat = inputLat;
        this.lon = inputLong;
        this.here = 0;
        this.notHere = 0;
    }

    setHere(here: number){
        this.here = here;
    }

    setNotHere(notHere: number){
        this.notHere = notHere;
    }
    
    reportHere(){
        this.here = this.here + 1;
    }

    reportNotHere(){
        this.notHere = this.notHere + 1;
    }
}