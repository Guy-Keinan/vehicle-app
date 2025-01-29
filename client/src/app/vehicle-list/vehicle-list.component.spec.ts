import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehicleListComponent } from './vehicle-list.component';
import { VehicleService } from '../services/vehicle.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('VehicleListComponent', () => {
  let component: VehicleListComponent;
  let fixture: ComponentFixture<VehicleListComponent>;
  let vehicleService: jasmine.SpyObj<VehicleService>;  // Create a spy for VehicleService

  beforeEach(async () => {
    const vehicleServiceSpy = jasmine.createSpyObj('VehicleService', ['getVehicles']);  // Mock the method(s) needed

    // Return a mock observable when getVehicles is called
    vehicleServiceSpy.getVehicles.and.returnValue(of([{ id: 1, name: 'Car 1' }, { id: 2, name: 'Car 2' }]));

    await TestBed.configureTestingModule({
      declarations: [VehicleListComponent],
      imports: [
        HttpClientTestingModule,  // Import HttpClientTestingModule for mocking HTTP requests
        FormsModule               // Import FormsModule for ngModel support
      ],
      providers: [
        { provide: VehicleService, useValue: vehicleServiceSpy }  // Use the mocked VehicleService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleListComponent);
    component = fixture.componentInstance;
    vehicleService = TestBed.inject(VehicleService) as jasmine.SpyObj<VehicleService>;  // Inject the mocked service
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load vehicles on init', () => {
    component.ngOnInit();
    expect(vehicleService.getVehicles).toHaveBeenCalled();
    expect(component.vehicles.length).toBe(2);
  });

  it('should filter vehicles by status', () => {
    const mockVehicles = [
      { id: 1, licensePlate: 'ABC123', manufacturer: 'Toyota', model: 'Corolla', status: 'active' },
      { id: 2, licensePlate: 'XYZ456', manufacturer: 'Honda', model: 'Civic', status: 'inactive' },
      { id: 3, licensePlate: 'LMN789', manufacturer: 'Ford', model: 'Mustang', status: 'active' }
    ];
  
    component.vehicles = mockVehicles;
    component.statusFilter = 'active';
  
    component.filterByStatus();
  
    expect(component.filteredVehicles.length).toBe(2);
    expect(component.filteredVehicles).toEqual([
      { id: 1, licensePlate: 'ABC123', manufacturer: 'Toyota', model: 'Corolla', status: 'active' },
      { id: 3, licensePlate: 'LMN789', manufacturer: 'Ford', model: 'Mustang', status: 'active' }
    ]);
  });
  
});
