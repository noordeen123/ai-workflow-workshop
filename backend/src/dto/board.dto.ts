import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateBoardDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class BoardResponseDto {
  id: number;
  name: string;
  description?: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  lastAccessed: Date;
  taskCount?: number;
}