import { Resolver, Query, Args, ResolveProperty, Parent, Mutation, Context } from '@nestjs/graphql';
import { Logger, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';

@Resolver()
export class PageBoxResolver {
  private logger = new Logger('PageBoxResolver');
  constructor(private readonly appService: AppService){

  }

  @Mutation()
  @UseInterceptors(FileInterceptor('file'))
  uploadVCF(@UploadedFile() file): string {
  //  this.logger.verbose(`User uploaded VCF file`);
    return this.appService.uploadVCF(file);
  }
}

