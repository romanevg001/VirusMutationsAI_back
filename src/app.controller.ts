import { Controller, Logger, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { extname } from 'path';
import { diskStorage } from 'multer';


@Controller('api')
export class AppController {
  private logger = new Logger('AppController');
  constructor(private readonly appService: AppService) {}

  @Post('/uploadVCF')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './assets/vcf',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        return cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }))
  uploadVCF(@UploadedFile() file) {
    this.logger.verbose(`User uploaded VCF file`);
    return this.appService.uploadVCF(file.path);
  }
}
