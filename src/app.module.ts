import { Module, CacheModule } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE, APP_FILTER } from '@nestjs/core';
import { GqlHttpExceptionFilter } from './shared/gql-http-error.filter';
import { HttpErrorFilter } from './shared/http-error.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { ValidationPipe } from './shared/validation.pipe';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    CacheModule.register(),
    // GraphQLModule.forRoot({
    //   installSubscriptionHandlers: true,
    //   typePaths: ['./**/*.graphql'],
    //   context: ({req}) => ({ req }),
    // }),
  ],
  controllers: [AppController],
  providers: [
    {provide: APP_FILTER, useClass: HttpErrorFilter },
 //   {provide: 'APP_FILTER_GQL', useClass: GqlHttpExceptionFilter },
    {provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    {provide: APP_PIPE, useClass: ValidationPipe },
    AppService,
  ],
})
export class AppModule {}