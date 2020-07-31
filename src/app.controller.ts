import { Controller, Get, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { Logger } from '@nestjs/common';

@Controller('api')
export class AppController {
  private logger = new Logger('AppController');
  constructor(private readonly appService: AppService) {}

  @Post('/uploadVCF')
  @UseInterceptors(FileInterceptor('file'))
  uploadVCF(@UploadedFile() file): string {
    this.logger.verbose(`User uploaded VCF file`);
    return this.appService.uploadVCF(file);
  }
}
