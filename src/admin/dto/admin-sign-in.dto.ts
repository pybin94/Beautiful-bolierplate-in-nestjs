import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AdminSignInDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    @ApiProperty()
    identity: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: 'password only accepts english and number'
    })
    @ApiProperty()
    password: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(20)
    @ApiProperty()
    user_name: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    auth: string;

    @IsNumber()
    @IsOptional()
    @MinLength(2)
    @MaxLength(50)
    @ApiProperty()
    set1: string;

    @IsNumber()
    @IsOptional()
    @MinLength(2)
    @MaxLength(50)
    @ApiProperty()
    set2: string;

    @IsString()
    @IsOptional()
    @MinLength(2)
    @MaxLength(50)
    @ApiProperty()
    meno: string;
}