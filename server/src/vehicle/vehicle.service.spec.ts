import { Test, TestingModule } from '@nestjs/testing';
import { VehicleService } from './vehicle.service';
import { Repository } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';

describe('VehicleService', () => {
  let service: VehicleService;
  let repository: Repository<Vehicle>;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehicleService,
        {
          provide: getRepositoryToken(Vehicle),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            preload: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<VehicleService>(VehicleService);
    repository = module.get<Repository<Vehicle>>(getRepositoryToken(Vehicle));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all vehicles when no status is provided', async () => {
      const vehicles: Vehicle[] = [{
        id: 1,
        status: 'active',
        licensePlate: 'XYZ123',
        manufacturer: 'Toyota',
        model: 'Camry',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 2,
        status: 'inactive',
        licensePlate: 'ABC456',
        manufacturer: 'Honda',
        model: 'Civic',
        createdAt: new Date(),
        updatedAt: new Date(),
      }];
      jest.spyOn(repository, 'find').mockResolvedValue(vehicles);
      const result = await service.findAll();
      expect(result).toEqual(vehicles);
    });

    it('should return filtered vehicles based on status', async () => {
      const vehicles: Vehicle[] = [{
        id: 1,
        status: 'active',
        licensePlate: 'XYZ123',
        manufacturer: 'Toyota',
        model: 'Camry',
        createdAt: new Date(),
        updatedAt: new Date(),
      }];
      jest.spyOn(repository, 'find').mockResolvedValue(vehicles);
      const result = await service.findAll('active');
      expect(result).toEqual(vehicles);
    });

    it('should throw BadRequestException for invalid status', async () => {
      // Using a valid value for the status parameter to simulate the logic
      await expect(service.findAll('invalidStatus' as any)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findOne', () => {
    it('should return a vehicle by ID', async () => {
      const vehicle: Vehicle = {
        id: 1,
        status: 'active',
        licensePlate: 'XYZ123',
        manufacturer: 'Toyota',
        model: 'Camry',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(repository, 'findOne').mockResolvedValue(vehicle);
      const result = await service.findOne(1);
      expect(result).toEqual(vehicle);
    });

    it('should throw NotFoundException if vehicle not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);
      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update the vehicle if it exists', async () => {
      const vehicle: Vehicle = {
        id: 1,
        status: 'active',
        licensePlate: 'XYZ123',
        manufacturer: 'Toyota',
        model: 'Camry',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const updatedVehicle: Vehicle = {
        ...vehicle,
        status: 'inactive'
      };

      jest.spyOn(repository, 'preload').mockResolvedValue(updatedVehicle);
      jest.spyOn(repository, 'save').mockResolvedValue(updatedVehicle);

      const result = await service.update(1, { status: 'inactive' });
      expect(result).toEqual(updatedVehicle);
    });

    it('should throw NotFoundException if vehicle does not exist', async () => {
      jest.spyOn(repository, 'preload').mockResolvedValue(undefined); // Return undefined instead of null
      await expect(service.update(1, { status: 'inactive' })).rejects.toThrow(NotFoundException);
    });

    it('should throw ConflictException for duplicate unique key', async () => {
      const error = new ConflictException('duplicate key value violates unique constraint');
      jest.spyOn(repository, 'preload').mockRejectedValue(error);
      await expect(service.update(1, { status: 'inactive' })).rejects.toThrow(ConflictException);
    });
  });

  describe('remove', () => {
    it('should remove the vehicle if it exists', async () => {
      jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1, raw: [] });
      await service.remove(1);
      expect(repository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if vehicle does not exist', async () => {
      jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 0, raw: [] });
      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });

    it('should throw an error if something goes wrong during removal', async () => {
      const error = new Error('Something went wrong');
      jest.spyOn(repository, 'delete').mockRejectedValue(error);
      await expect(service.remove(1)).rejects.toThrowError('Something went wrong');
    });
  });
})