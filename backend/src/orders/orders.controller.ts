import {
  Controller,
  Get,
  // Post,
  // Body,
  // Patch,
  Param,
  Delete,
  UseGuards,
  Body,
  Patch,
  HttpException,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
// import { CreateOrderDto } from './dto/create-order.dto';
// import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/strategies/roles.decorator';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // @Post()
  // create(@Body() createOrderDto: CreateOrderDto) {
  //   return this.ordersService.create(createOrderDto);
  // }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get('user/:userId')
  async HistoryUser(@Param('userId') userId: number): Promise<Order[]> {
    return this.ordersService.findHistoryByUser(userId);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin') // Ensure only admin can access this route
  // @Patch(':id/status') // Define the route for updating order status
  // async updateOrderStatus(
  //   @Param('id') id: number,
  //   @Body() updateOrderDto: UpdateOrderDto,
  // ) {
  //   return this.ordersService.updateOrderStatus(id, updateOrderDto);
  // }
  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async updateOrderStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    try {
      const result = await this.ordersService.updateOrderStatus(
        id,
        updateOrderDto,
      );

      return {
        success: true,
        message: `Order status updated from ${result.previousStatus} to ${updateOrderDto.status}`,
        data: {
          order: result,
          previousStatus: result.previousStatus,
          newStatus: updateOrderDto.status,
        },
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: `Failed to update order ${id} status`,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
