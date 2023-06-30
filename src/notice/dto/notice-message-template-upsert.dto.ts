import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class NoticeMessageTemplateUpsertDto {
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
}