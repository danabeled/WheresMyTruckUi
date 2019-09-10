import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MenuItem } from 'src/app/menuitem';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  baseUrl: string = environment.url + '/api/menu';

  getTrucksWithMenus(){
    const url = this.baseUrl + '/all';
    return this.http.get(url);
  }

  postNewMenuItem(item: MenuItem){
    const url = this.baseUrl + '/add';
    return this.http.post(url, item);
  }
}
