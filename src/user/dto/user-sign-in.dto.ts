import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class UserSignInDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    @ApiProperty()
    identity: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(15)
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

    @IsString()
    @IsOptional()
    @MinLength(2)
    @MaxLength(20)
    @ApiProperty()
    set1: string;

    @IsString()
    @IsOptional()
    @MinLength(2)
    @MaxLength(20)
    @ApiProperty()
    set2: string;

    @IsString()
    @IsOptional()
    @MinLength(2)
    @MaxLength(20)
    @ApiProperty()
    set3: string;

    @IsString()
    @IsOptional()
    @MinLength(2)
    @MaxLength(50)
    @ApiProperty()
    meno: string;
}