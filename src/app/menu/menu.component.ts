import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private MenuService: MenuService){}
  menus;
  img;
  ngOnInit() {
    this.MenuService.getTrucksWithMenus().subscribe((result) =>
    {
      this.menus = result;
      console.log(this.menus);
      for(let i=0; i<this.menus.length; i++)
      {
        this.img = btoa(String.fromCharCode.apply(null, this.menus[0].img.data.data));
      }
    });
  }

}
