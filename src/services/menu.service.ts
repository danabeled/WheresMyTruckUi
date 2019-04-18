import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  baseUrl: string = environment.url + '/api';

  getTrucksWithMenus(){
    const url = this.baseUrl + '/menu/all';
    return this.http.get(url);
  }
}
