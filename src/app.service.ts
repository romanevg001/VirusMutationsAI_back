import { Injectable, Logger } from '@nestjs/common';
import * as execa from 'execa';
import * as path from 'path';


@Injectable()
export class AppService {
  private logger = new Logger('AppService');

  uploadVCF(file): any {
    const jsonPath = path.join(__dirname, '..', 'scripts', 'vcf_to_articles_json.py');
    this.logger.verbose('jsonPath =>', jsonPath);
    (async () => {
      // Catching an error
      try {
        return await execa(`python ${jsonPath} ${file}`);
      } catch (error) {
          console.log(error);
      }
    })();

    return {'dd':'Hello World!'};

  }

}
