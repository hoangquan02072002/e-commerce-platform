import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MfaOtpService } from './mfa-otp.service';
import { CreateMfaOtpDto } from './dto/create-mfa-otp.dto';
import { UpdateMfaOtpDto } from './dto/update-mfa-otp.dto';

@Controller('mfa-otp')
export class MfaOtpController {
  constructor(private readonly mfaOtpService: MfaOtpService) {}

  // @Post()
  // create(@Body() createMfaOtpDto: CreateMfaOtpDto) {
  //   return this.mfaOtpService.create(createMfaOtpDto);
  // }

  // @Get()
  // findAll() {
  //   return this.mfaOtpService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.mfaOtpService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMfaOtpDto: UpdateMfaOtpDto) {
  //   return this.mfaOtpService.update(+id, updateMfaOtpDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.mfaOtpService.remove(+id);
  // }
}
