import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateBillDto {
  @IsUUID()
  payerId!: string;

  @IsString()
  title!: string;

  @IsNumber()
  amount!: number;
}
