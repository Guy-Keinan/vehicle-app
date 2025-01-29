import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.css'],
  standalone: false
})
export class EditVehicleComponent implements OnInit {
  vehicleForm!: FormGroup;
  vehicleId!: number;
  errorMessage: string | null = null; // Add this for error handling

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private vehicleService: VehicleService
  ) {}

  ngOnInit(): void {
    // Get the vehicle ID from the route
    this.vehicleId = Number(this.route.snapshot.paramMap.get('id'));

    // Initialize the form
    this.vehicleForm = this.fb.group({
      licensePlate: ['', [Validators.required,  this.notEmptyValidator()]],
      manufacturer: ['', Validators.required],
      model: ['', Validators.required],
      status: ['']
    });

    // Fetch the vehicle data and populate the form
    this.vehicleService.getVehicles().subscribe(
      (vehicles) => {
        const vehicle = vehicles.find((v: any) => v.id === this.vehicleId);
        if (vehicle) {
          this.vehicleForm.patchValue(vehicle);
        }
      },
      (error) => {
        this.errorMessage = 'Failed to load vehicle details. Please try again later.';
      }
    );
  }

  notEmptyValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value && control.value.trim() !== '' ? null : { notEmpty: true };
    };
  }

  onSubmit(): void {
    if (this.vehicleForm.valid) {
      this.vehicleService.updateVehicle(this.vehicleId, this.vehicleForm.value).subscribe(
        () => {
          alert('Vehicle updated successfully!');
          this.router.navigate(['/']);
        },
        (error) => {
          if (error.status === 409) { 
            this.errorMessage = error.error.message; // Extract the backend error message
          } else {
            this.errorMessage = 'An unexpected error occurred. Please try again.';
          }
        }
      );
    }
  }
}
