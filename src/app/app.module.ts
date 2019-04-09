import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, ApplicationRef  } from '@angular/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';

//Material Design imports -- move eventually?
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';

import {MatButtonModule, MatCheckboxModule, MatInputModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule,  } from '@angular/material';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { AppRoutingModule }     from './app-routing.module';
import { AboutComponent } from './about/about.component';

import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    NavbarComponent,
    AboutComponent
  ],
  exports: [
    AppComponent,
    AboutComponent,
    NavbarComponent,
    MapComponent],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatSidenavModule,
    AppRoutingModule,
    MatIconModule,
    MatListModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatInputModule,
    AgmJsMarkerClustererModule,
    HttpClientModule,
    MatAutocompleteModule,
    AgmCoreModule.forRoot({
      apiKey: ''
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
