import { IsIn, IsNotEmpty, IsOptional, IsString, ValidateIf } from "class-validator";

export class CreateVehicleDto {
    @IsString()
    @IsNotEmpty()
    @ValidateIf(o => o.licensePlate !== '')
    licensePlate: string;

    @IsString()
    @IsNotEmpty()
    manufacturer: string;

    @IsString()
    @IsNotEmpty()
    model: string;

    @IsString()
    @IsOptional()
    @IsIn(['active', 'inactive'])
    status?: 'active' | 'inactive';
}
