import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleModule } from './vehicle/vehicle.module';
import { Vehicle } from './vehicle/entities/vehicle.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'postgres', // Use the postgres service name defined in docker-compose.yml
      port: 5432,
      username: process.env.DATABASE_USERNAME || 'postgres',
      password: process.env.DATABASE_PASSWORD || '12345',
      database: process.env.DATABASE_NAME || 'mycars',
      entities: [Vehicle],
      synchronize: true,
    }),
    
    VehicleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
