import { TestBed } from '@angular/core/testing';
import { Vehicle, VehicleService } from './vehicle.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';  // Import HttpClientTestingModule

describe('VehicleService', () => {
  let service: VehicleService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // Add HttpClientTestingModule to imports
      providers: [VehicleService]          // Explicitly provide VehicleService
    });
    service = TestBed.inject(VehicleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch vehicles', () => {
    const mockVehicles: Vehicle[] = [
      {
        id: 1,
        licensePlate: 'ABC123',
        manufacturer: 'Toyota',
        model: 'Corolla',
        status: 'active',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z'
      },
      {
        id: 2,
        licensePlate: 'XYZ456',
        manufacturer: 'Honda',
        model: 'Civic',
        status: 'inactive',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z'
      }
    ];

    service.getVehicles().subscribe(vehicles => {
      expect(vehicles.length).toBe(2);
      expect(vehicles).toEqual(mockVehicles);
    });

    const req = httpMock.expectOne('http://localhost:3000/vehicle');
    expect(req.request.method).toBe('GET');
    req.flush(mockVehicles);
  });

  it('should add a vehicle', () => {
    const newVehicle: Vehicle = {
      id: 3,
      licensePlate: 'LMN789',
      manufacturer: 'Ford',
      model: 'Mustang',
      status: 'active',
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z'
    };
  
    service.addVehicle(newVehicle).subscribe(vehicle => {
      expect(vehicle).toEqual(newVehicle);
    });
  
    const req = httpMock.expectOne('http://localhost:3000/vehicle');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newVehicle);
    req.flush(newVehicle);
  });

  it('should update a vehicle', () => {
    const updatedVehicle: Vehicle = {
      id: 1,
      licensePlate: 'XYZ456',
      manufacturer: 'Honda',
      model: 'Civic',
      status: 'inactive',
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z'
    };
  
    service.updateVehicle(1, updatedVehicle).subscribe(vehicle => {
      expect(vehicle).toEqual(updatedVehicle);
    });
  
    const req = httpMock.expectOne('http://localhost:3000/vehicle/1');
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(updatedVehicle);
    req.flush(updatedVehicle);
  });
  
  it('should delete a vehicle', () => {
    service.deleteVehicle(1).subscribe(response => {
      expect(response).toBeNull();
    });
  
    const req = httpMock.expectOne('http://localhost:3000/vehicle/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
  
  afterEach(() => {
    httpMock.verify();
  });
});
