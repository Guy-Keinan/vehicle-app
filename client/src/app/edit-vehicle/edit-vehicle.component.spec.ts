import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditVehicleComponent } from './edit-vehicle.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VehicleService } from '../services/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('EditVehicleComponent', () => {
  let component: EditVehicleComponent;
  let fixture: ComponentFixture<EditVehicleComponent>;
  let vehicleServiceSpy: jasmine.SpyObj<VehicleService>;

  beforeEach(async () => {
    vehicleServiceSpy = jasmine.createSpyObj('VehicleService', ['getVehicles', 'updateVehicle']);

    vehicleServiceSpy.getVehicles.and.returnValue(of([{
      id: 1,
      licensePlate: 'ABC123',
      manufacturer: 'Toyota',
      model: 'Corolla',
      status: 'active',
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z'
    }]));

    vehicleServiceSpy.updateVehicle.and.returnValue(of({
      id: 1,
      licensePlate: 'XYZ456',
      manufacturer: 'Honda',
      model: 'Civic',
      status: 'inactive',
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z'
    }));

    await TestBed.configureTestingModule({
      declarations: [EditVehicleComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        { provide: VehicleService, useValue: vehicleServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } },
        },
        {
          provide: Router,
          useValue: { navigate: () => { } },
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load vehicle details on init', () => {
    component.ngOnInit();
    expect(vehicleServiceSpy.getVehicles).toHaveBeenCalled();
    expect(component.vehicleForm.value.licensePlate).toBe('ABC123');
  });  
});
