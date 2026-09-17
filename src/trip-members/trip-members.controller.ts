import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TripMembersService } from './trip-members.service';
import { AddMemberDto } from './dto/add-member.dto';
import { Request as ExpressRequest } from 'express';

export interface AuthRequest extends ExpressRequest {
  user: {
    userId: string;
  };
}

@Controller('trips/:tripId/members')
@UseGuards(JwtAuthGuard)
export class TripMembersController {
  constructor(private readonly service: TripMembersService) {}

  // ➕ add member
  @Post()
  addMember(
    @Param('tripId') tripId: string,
    @Body() dto: AddMemberDto,
    @Req() req: AuthRequest,
  ) {
    const requesterId = req.user.userId;
    return this.service.addMember(tripId, dto.userId, requesterId);
  }

  // 📋 list members
  @Get()
  getMembers(@Param('tripId') tripId: string) {
    return this.service.getMembers(tripId);
  }

  // ❌ remove member
  @Delete(':userId')
  removeMember(
    @Param('tripId') tripId: string,
    @Param('userId') userId: string,
  ) {
    return this.service.removeMember(tripId, userId);
  }
}
