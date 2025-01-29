import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) { }

  @Post()
  async create(@Body() createVehicleDto: CreateVehicleDto) {
    return await this.vehicleService.create(createVehicleDto);
  }

  @Get()
  async findAll(@Query('status') status?: 'active' | 'inactive') {
    return await this.vehicleService.findAll(status);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.vehicleService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return await this.vehicleService.update(+id, updateVehicleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.vehicleService.remove(+id);
  }
}
