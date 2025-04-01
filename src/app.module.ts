import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MiddlewareConsumer } from '@nestjs/common';

import { CommonModule } from './common/common.module';
import { TenantModule } from './tenant/tenant.module';
import { FilesModule } from './files/files.module';
import { RoomService } from './room/room.service';
import { RoomModule } from './room/room.module';
import { UsersModule } from './users/users.module';
import { FasilityModule } from './facility/facility.module';
import { ReportModule } from './report/report.module';
import { FinanceModule } from './finance/finance.module';

@Module({
  imports: [CommonModule, TenantModule, FilesModule, RoomModule, UsersModule, FasilityModule, ReportModule, FinanceModule],
  controllers: [AppController],
  providers: [AppService, RoomService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().exclude('/', '/docs', '/docs-json').forRoutes('*');
  }
}
