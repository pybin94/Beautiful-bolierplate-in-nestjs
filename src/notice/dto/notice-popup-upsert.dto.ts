import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class NoticePopupUpsertDto {
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
    @IsNotEmpty({ message: "로그인 표시 여부를 설정해주세요."})
    @ApiProperty()
    isSigned: number;

    @IsNumber()
    @IsNotEmpty({ message: "자동배열을 설정해주세요."})
    @ApiProperty()
    isAuto: number;

    @IsOptional()
    @ApiProperty()
    positionX: number;

    @IsOptional()
    @ApiProperty()
    positionY: number;

    @IsNumber()
    @IsNotEmpty({ message: "팝업 배열 순서을 설정해주세요."})
    @ApiProperty()
    positionZ: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty()
    targetLevel: number;
}