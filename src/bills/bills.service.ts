import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';

@Injectable()
export class BillsService {
  constructor(private prisma: PrismaService) {}

  async create(tripId: string, dto: CreateBillDto) {
    return this.prisma.bill.create({
      data: {
        ...dto,
        tripId,
      },
    });
  }

  async findAllByTrip(tripId: string) {
    return this.prisma.bill.findMany({
      where: {
        tripId,
      },
    });
  }

  async findOne(tripId: string, id: string) {
    return this.prisma.bill.findFirst({
      where: {
        id,
        tripId,
      },
    });
  }

  async update(tripId: string, id: string, dto: UpdateBillDto) {
    return this.prisma.bill.update({
      where: {
        id,
        tripId,
      },
      data: dto,
    });
  }

  async remove(tripId: string, id: string) {
    return this.prisma.bill.delete({
      where: {
        id,
      },
    });
  }
}
