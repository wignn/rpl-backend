import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MiddlewareConsumer } from '@nestjs/common';

import { CommonModule } from './common/common.module';
import { TenantModule } from './tenant/tenant.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [UsersModule, CommonModule, TenantModule, FilesModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
  consumer
   .apply()
   .exclude('/', '/docs', '/docs-json')
   .forRoutes('*');
  }
}
