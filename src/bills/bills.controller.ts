import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BillsService } from './bills.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';

@Controller('trips/:tripId/bills')
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  @Post()
  create(
    @Param('tripId') tripId: string,
    @Body() createBillDto: CreateBillDto,
  ) {
    return this.billsService.create(tripId, createBillDto);
  }

  @Get()
  findAll(@Param('tripId') tripId: string) {
    return this.billsService.findAllByTrip(tripId);
  }

  @Get(':id')
  findOne(@Param('tripId') tripId: string, @Param('id') id: string) {
    return this.billsService.findOne(tripId, id);
  }

  @Patch(':id')
  update(
    @Param('tripId') tripId: string,
    @Param('id') id: string,
    @Body() updateBillDto: UpdateBillDto,
  ) {
    return this.billsService.update(tripId, id, updateBillDto);
  }

  @Delete(':id')
  remove(@Param('tripId') tripId: string, @Param('id') id: string) {
    return this.billsService.remove(tripId, id);
  }
}
