import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class NoticeAdminUpsertDto {
    @IsOptional()
    @ApiProperty()
    id: number;

    @IsString()
    @IsNotEmpty({ message: "제목을 입력해주세요." })
    @MaxLength(20, { message: "제목은 20자 이하로 입력해주세요."})
    @ApiProperty()
    title: string;

    @IsString()
    @IsNotEmpty({ message: "내용을 입력해주세요."})
    @ApiProperty()
    contents: string;

    @IsNumber()
    @IsNotEmpty({ message: "상태를 설정해주세요."})
    @ApiProperty()
    status: number;

    @IsNumber()
    @IsNotEmpty({ message: "상단 고정을 설정해주세요."})
    @ApiProperty()
    isFixed: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty()
    targetLevel: number;
}