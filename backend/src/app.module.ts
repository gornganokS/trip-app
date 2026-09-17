import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { TripsModule } from './trips/trips.module';
import { TripMembersModule } from './trip-members/trip-members.module';
import { TripPlacesModule } from './trip-places/trip-places.module';
import { BillsModule } from './bills/bills.module';
import { BillSplitsController } from './bill-splits/bill-splits.controller';
import { BillSplitsService } from './bill-splits/bill-splits.service';
import { BillSplitsModule } from './bill-splits/bill-splits.module';

@Module({
  imports: [AuthModule, PrismaModule, UsersModule, TripsModule, TripMembersModule, TripPlacesModule, BillsModule, BillSplitsModule],
  controllers: [AppController, BillSplitsController],
  providers: [AppService, BillSplitsService],
})
export class AppModule {}
