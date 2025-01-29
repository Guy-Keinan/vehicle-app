import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css'],
  standalone: false
})
export class AddVehicleComponent {
  vehicleForm: FormGroup;
  errorMessage: string | null = null; // Added to store error messages

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    private router: Router
  ) {
    this.vehicleForm = this.fb.group({
      licensePlate: ['', Validators.required],
      manufacturer: ['', Validators.required],
      model: ['', Validators.required],
      status: ['active', Validators.required], // Default status to "active"
    });
  }

  onSubmit(): void {
    if (this.vehicleForm.invalid) {
      alert('Please fill in all required fields.'); // You can replace this with a better UI message
      return;
    }

    if (this.vehicleForm.valid) {
      this.vehicleService.addVehicle(this.vehicleForm.value).subscribe(
        () => {
          console.log('Vehicle added successfully');
          this.router.navigate(['/']);
        },
        (error) => {
          if (error.status === 409) {
            this.errorMessage = error.error.message; // Extract error message from backend
          } else {
            this.errorMessage = 'An unexpected error occurred. Please try again.';
          }
        }
      );
    }
  }

  onCancel(): void {
    this.router.navigate(['/']); // Redirect to home page
  }
}
