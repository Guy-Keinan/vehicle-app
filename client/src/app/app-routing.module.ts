import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { EditVehicleComponent } from './edit-vehicle/edit-vehicle.component';

const routes: Routes = [
  { path: '', component: VehicleListComponent },
  { path: 'add-vehicle', component: AddVehicleComponent },
  { path: 'edit/:id', component: EditVehicleComponent }, // Add this route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
