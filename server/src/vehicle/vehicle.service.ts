import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { log } from 'console';
import { stat } from 'fs';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) { }

  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    try {
      const newVehicle = this.vehicleRepository.create(createVehicleDto);
      return await this.vehicleRepository.save(newVehicle);
    } catch (error) {
      if (error instanceof QueryFailedError && error.message.includes('duplicate key value violates unique constraint')) {
        throw new ConflictException('A vehicle with this unique identifier already exists.');
      }
      throw error;
    }
  }

  async findAll(status?: 'active' | 'inactive'): Promise<Vehicle[]> {
    try {
      if (status) {
        if (status !== 'active' && status !== 'inactive') {
          throw new BadRequestException('Invalid status option. Accepted values are "active" or "inactive".');
        }
        return await this.vehicleRepository.find({ where: { status } });
      }
      return await this.vehicleRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<Vehicle> {
    try {
      const vehicle = await this.vehicleRepository.findOne({ where: { id } });
      if (!vehicle) {
        throw new NotFoundException(`Vehicle with ID:${id} was not found.`);
      }
      return vehicle;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateVehicleDto: UpdateVehicleDto): Promise<Vehicle> {
    try {
      const vehicle = await this.vehicleRepository.preload({ id, ...updateVehicleDto });
      if (!vehicle) {
        throw new NotFoundException(`Vehicle with ID:${id} was not found.`);
      }
      return await this.vehicleRepository.save(vehicle);
    } catch (error) {
      if (error instanceof QueryFailedError && error.message.includes('duplicate key value violates unique constraint')) {
        throw new ConflictException('A vehicle with this unique identifier already exists.');
      }
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const result = await this.vehicleRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Vehicle with ID:${id} was not found.`);
      }
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new Error('Something went wrong');
      }
      throw error;
    }
  }

}
