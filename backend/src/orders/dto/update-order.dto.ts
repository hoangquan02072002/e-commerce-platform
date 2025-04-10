import { IsEnum, IsNotEmpty } from 'class-validator';
import { OrderStatus } from '../entities/order.entity';

export class UpdateOrderDto {
  @IsEnum(OrderStatus) // Validate that the status is one of the enum values
  @IsNotEmpty()
  status: OrderStatus;
}
