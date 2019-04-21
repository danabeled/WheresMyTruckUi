import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/services/menu.service';
import { MenuItem } from '../menuitem';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private MenuService: MenuService){}
  menus;
  newItems: Array<MenuItem> = new Array<MenuItem>();
  
  reportNewItem(index){
    console.log(index);
    console.log(this.newItems[index]);
    this.menus[index].items.push({
      name: this.newItems[index].name, 
      price: this.newItems[index].price})
    console.log("New Item Reported");
    this.MenuService.postNewMenuItem(this.newItems[index]).subscribe((result) =>{
      console.log(result);
    });
  }

  ngOnInit() {
    this.MenuService.getTrucksWithMenus().subscribe((result) =>
    {
      this.menus = result;
      console.log(this.menus);
      for(let i=0; i<this.menus.length; i++)
      {
        let item = new MenuItem();
        item.truck = this.menus[i].truck;
        this.newItems.push(item);
        if(this.menus[i].img == undefined)
        {
          this.menus[i].imgbuffed = "";

        }
        else{
          this.menus[i].imgbuffed = btoa(String.fromCharCode.apply(null, this.menus[i].img.data.data));

        }
      }
    });
  }

}
