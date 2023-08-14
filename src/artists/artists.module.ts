import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { PrismaService } from '@/lib/prisma.service';

@Module({
  imports: [],
  controllers: [ArtistsController],
  providers: [ArtistsService, PrismaService],
})
export class ArtistsModule {}
