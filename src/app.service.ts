import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  uploadVCF(file): any {

    return {'dd':'Hello World!'};

  }

}
