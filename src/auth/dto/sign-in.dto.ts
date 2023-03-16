import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class SignInDto {
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

}