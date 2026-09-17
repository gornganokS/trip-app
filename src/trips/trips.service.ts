import { Injectable, NotFoundException } from '@nestjs/common';
import { Trip } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';

@Injectable()
export class TripsService {
  constructor(private readonly prisma: PrismaService) {}

  private async validateOwner(id: string, ownerId: string): Promise<Trip> {
    const trip = await this.prisma.trip.findFirst({
      where: {
        id,
        ownerId,
      },
    });
    if (!trip) {
      throw new NotFoundException('Trip not found');
    }
    return trip;
  }

  create(dto: CreateTripDto, ownerId: string): Promise<Trip> {
    return this.prisma.trip.create({
      data: {
        name: dto.name,
        description: dto.description,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
        ownerId,
      },
    });
  }

  findAll(ownerId: string): Promise<Trip[]> {
    return this.prisma.trip.findMany({
      where: {
        ownerId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  async findOne(id: string, ownerId: string) {
    const trip = await this.prisma.trip.findFirst({
      where: {
        id,
        ownerId,
      },
      include: {
        owner: true,
        members: true,
        places: true,
        bills: true,
      },
    });

    if (!trip) {
      throw new NotFoundException('Trip not found');
    }
    return trip;
  }
  async update(id: string, ownerId: string, dto: UpdateTripDto): Promise<Trip> {
    await this.validateOwner(id, ownerId);

    return this.prisma.trip.update({
      where: { id },
      data: dto,
    });
  }
  async remove(id: string, ownerId: string): Promise<void> {
    await this.validateOwner(id, ownerId);

    await this.prisma.trip.delete({
      where: {
        id,
      },
    });
  }
}
