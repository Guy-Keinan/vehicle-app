import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddVehicleComponent } from './add-vehicle.component';
import { ReactiveFormsModule } from '@angular/forms';  // Import ReactiveFormsModule if needed
import { HttpClientTestingModule } from '@angular/common/http/testing';  // Import HttpClientTestingModule for HTTP requests
import { VehicleService } from '../services/vehicle.service'; // Import VehicleService
import { Router } from '@angular/router';  // Mock Router if needed

describe('AddVehicleComponent', () => {
  let component: AddVehicleComponent;
  let fixture: ComponentFixture<AddVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddVehicleComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule], // Import ReactiveFormsModule and HttpClientTestingModule
      providers: [
        VehicleService,
        {
          provide: Router,
          useValue: { navigate: () => {} } // Mock Router, if it's used in your component
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid when the form is empty', () => {
    expect(component.vehicleForm.valid).toBeFalsy();
  });
  
  it('should be valid when all fields are filled correctly', () => {
    component.vehicleForm.controls['licensePlate'].setValue('ABC123');
    component.vehicleForm.controls['manufacturer'].setValue('Toyota');
    component.vehicleForm.controls['model'].setValue('Camry');
    component.vehicleForm.controls['status'].setValue('active');
  
    expect(component.vehicleForm.valid).toBeTruthy();
  });
  
  it('should not submit the form if invalid', () => {
    spyOn(window, 'alert');
    component.onSubmit();
    expect(window.alert).toHaveBeenCalledWith('Please fill in all required fields.');
  });

  it('should navigate to the home page when cancel is clicked', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    component.onCancel();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
