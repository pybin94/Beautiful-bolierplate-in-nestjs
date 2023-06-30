import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class NoticeAdminMessageUpsertDto {
    @IsOptional()
    @ApiProperty()
    id: number;

    @IsOptional()
    @ApiProperty()
    sendID: number;

    @IsOptional()
    @ApiProperty()
    playerIndex: Array<number>;

    @IsString()
    @IsNotEmpty({ message: "제목을 입력해주세요." })
    @MaxLength(20, { message: "제목은 20자 이하로 입력해주세요."})
    @ApiProperty()
    title: string;

    @IsString()
    @IsNotEmpty({ message: "내용을 입력해주세요."})
    @ApiProperty()
    contents: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    comments: string;

    @IsNumber()
    @IsNotEmpty({ message: "잘못된 접근입니다."})
    @ApiProperty()
    status: number;

    @IsNumber()
    @IsNotEmpty({ message: "잘못된 접근입니다."})
    @ApiProperty()
    isBroadcast: number;
}