import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TripMembersService {
  constructor(private prisma: PrismaService) {}

  async addMember(tripId: string, userId: string, requesterId: string) {
    const trip = await this.prisma.trip.findUnique({
      where: { id: tripId },
    });

    if (!trip) throw new Error('Trip not found');

    if (trip.ownerId !== requesterId) {
      throw new ForbiddenException('Only owner can add members');
    }

    return this.prisma.tripMember.create({
      data: {
        tripId,
        userId,
        role: 'member',
      },
    });
  }

  async getMembers(tripId: string) {
    return this.prisma.tripMember.findMany({
      where: { tripId },
      include: {
        trip: true,
      },
    });
  }

  async removeMember(tripId: string, userId: string) {
    return this.prisma.tripMember.delete({
      where: {
        tripId_userId: {
          tripId,
          userId,
        },
      },
    });
  }
}
