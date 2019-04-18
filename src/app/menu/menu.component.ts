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

  ngOnInit() {
    this.MenuService.getTrucksWithMenus().subscribe((result) =>
    {
      this.menus = result;
    });
  }

}
