import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../services/vehicle.service';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css'],
  standalone: false,
})
export class VehicleListComponent implements OnInit {
  vehicles: any[] = [];
  filteredVehicles: any[] = [];
  statusFilter: string = 'all'; // Default filter

  constructor(private vehicleService: VehicleService, private router: Router) { }

  ngOnInit(): void {
    this.loadVehicles();
  }

  // Load vehicles from the server
  loadVehicles(): void {
    this.vehicleService.getVehicles().subscribe(
      (data) => {
        this.vehicles = data;
        this.filteredVehicles = data;
        console.log('Vehicles loaded:', data);
      },
      (error) => {
        console.error('Error fetching vehicles:', error);
      }
    );
  }

  // Filter vehicles by status
  filterByStatus(): void {
    if (this.statusFilter === 'all') {
      this.filteredVehicles = this.vehicles;
    } else {
      this.filteredVehicles = this.vehicles.filter(
        (vehicle) => vehicle.status === this.statusFilter
      );
    }
  }

  // Delete a vehicle
  deleteVehicle(id: number): void {
    if (confirm('Are you sure you want to delete this vehicle?')) {
      this.vehicleService.deleteVehicle(id).subscribe(
        () => {
          console.log('Vehicle deleted:', id);
          this.loadVehicles();
        },
        (error) => {
          console.error('Error deleting vehicle:', error);
        }
      );
    }
  }

  // Navigate to the edit page
  editVehicle(id: number): void {
    this.router.navigate(['/edit', id]); // Route to the edit component with the vehicle ID
  }

  navigateToAddVehicle(): void {
    this.router.navigate(['/add-vehicle']);
  }
}
