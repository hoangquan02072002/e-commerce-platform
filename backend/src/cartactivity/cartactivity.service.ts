/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateCartactivityDto } from './dto/create-cartactivity.dto';
import { UpdateCartactivityDto } from './dto/update-cartactivity.dto';

@Injectable()
export class CartactivityService {
  create(createCartactivityDto: CreateCartactivityDto) {
    return 'This action adds a new cartactivity';
  }

  findAll() {
    return `This action returns all cartactivity`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cartactivity`;
  }

  update(id: number, updateCartactivityDto: UpdateCartactivityDto) {
    return `This action updates a #${id} cartactivity`;
  }

  remove(id: number) {
    return `This action removes a #${id} cartactivity`;
  }
}
