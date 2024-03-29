
import { RouterModule, Routes } from '@angular/router';

import { MapComponent } from './map/map.component';
import { NgModule } from '@angular/core';
import { AboutComponent } from './about/about.component';
import {MatButtonModule, MatCheckboxModule, MatInputModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule,  } from '@angular/material';
import { MenuComponent } from './menu/menu.component';


const appRoutes: Routes = [
    { path: '', redirectTo: '/map', pathMatch: 'full'},
    { path: 'map', component: MapComponent},
    { path: 'menus', component: MenuComponent},
    { path: 'map/at/:latlon', component: MapComponent},
    { path: 'about', component: AboutComponent}
  ];
  


  @NgModule({
    imports: [ MatInputModule,
      RouterModule.forRoot(appRoutes) ],
    exports: [ RouterModule ]
  })
  
  export class AppRoutingModule {}