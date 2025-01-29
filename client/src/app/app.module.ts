import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { HttpClientModule } from '@angular/common/http';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditVehicleComponent } from './edit-vehicle/edit-vehicle.component';

@NgModule({
  declarations: [
    AppComponent,
    VehicleListComponent,
    AddVehicleComponent,
    EditVehicleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
