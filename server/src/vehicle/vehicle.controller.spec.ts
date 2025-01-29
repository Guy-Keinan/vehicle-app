import { Test, TestingModule } from '@nestjs/testing';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

describe('VehicleController', () => {
  let controller: VehicleController;
  let service: VehicleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehicleController],
      providers: [
        {
          provide: VehicleService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<VehicleController>(VehicleController);
    service = module.get<VehicleService>(VehicleService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call create on the service with the correct arguments', async () => {
      const createVehicleDto: CreateVehicleDto = {
        licensePlate: 'ABC123',
        manufacturer: 'Toyota',
        model: 'Corolla',
        status: 'active'  // Correct status value
      };

      const result = {
        id: 1,
        licensePlate: 'ABC123',
        manufacturer: 'Toyota',
        model: 'Corolla',
        status: 'active' as 'active' | 'inactive',  // Ensure the correct type
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'create').mockResolvedValue(result);  // Now correctly mock the 'create' method

      const response = await controller.create(createVehicleDto);  // Perform the actual controller call

      expect(service.create).toHaveBeenCalledWith(createVehicleDto);
      expect(response).toEqual(result);  // Assert the returned value is as expected
    });
  });

  describe('findAll', () => {
    it('should call findAll on the service with the correct status', async () => {
      const status = 'active';
      const vehicles = [
        {
          id: 1,
          licensePlate: 'ABC123',
          manufacturer: 'Toyota',
          model: 'Corolla',
          status: 'active' as 'active' | 'inactive',  // Explicit type for status
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          licensePlate: 'XYZ456',
          manufacturer: 'Honda',
          model: 'Civic',
          status: 'active' as 'active' | 'inactive',  // Explicit type for status
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(vehicles);

      const response = await controller.findAll(status);

      expect(service.findAll).toHaveBeenCalledWith(status);
      expect(response).toEqual(vehicles);
    });

    it('should call findAll on the service without status if not provided', async () => {
      const vehicles = [
        {
          id: 1,
          licensePlate: 'ABC123',
          manufacturer: 'Toyota',
          model: 'Corolla',
          status: 'active' as 'active' | 'inactive',  // Explicit type for status
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          licensePlate: 'XYZ456',
          manufacturer: 'Honda',
          model: 'Civic',
          status: 'inactive' as 'active' | 'inactive',  // Explicit type for status
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(vehicles);

      const response = await controller.findAll();

      expect(service.findAll).toHaveBeenCalledWith(undefined);
      expect(response).toEqual(vehicles);
    });
  });

  describe('findOne', () => {
    it('should call findOne on the service with the correct id', async () => {
      const vehicleId = '1';
      const vehicle = {
        id: 1,
        licensePlate: 'ABC123',
        manufacturer: 'Toyota',
        model: 'Corolla',
        status: 'active' as 'active' | 'inactive',  // Explicit type for status
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(vehicle);

      const response = await controller.findOne(vehicleId);

      expect(service.findOne).toHaveBeenCalledWith(1);  // Convert string to number
      expect(response).toEqual(vehicle);
    });
  });

  describe('update', () => {
    it('should call update on the service with the correct arguments', async () => {
      const updateVehicleDto: UpdateVehicleDto = {
        licensePlate: 'XYZ456',
        manufacturer: 'Honda',
        model: 'Civic',
        status: 'inactive'
      };

      const updatedVehicle = {
        id: 1,
        licensePlate: 'XYZ456',
        manufacturer: 'Honda',
        model: 'Civic',
        status: 'inactive' as 'active' | 'inactive',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'update').mockResolvedValue(updatedVehicle);

      const response = await controller.update('1', updateVehicleDto);

      expect(service.update).toHaveBeenCalledWith(1, updateVehicleDto);
      expect(response).toEqual(updatedVehicle);
    });
  });

  describe('remove', () => {
    it('should call remove on the service with the correct id', async () => {
      const vehicleId = '1';

      jest.spyOn(service, 'remove').mockResolvedValueOnce(undefined); // or `Promise.resolve()` for async

      const response = await controller.remove(vehicleId);

      expect(service.remove).toHaveBeenCalledWith(1);
      expect(response).toBeUndefined(); // Expect no response value as it is void
    });
  });
});

