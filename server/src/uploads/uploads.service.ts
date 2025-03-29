import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UploadsService {
  constructor(
    private configService: ConfigService,
    private databaseService: DatabaseService,
  ) {}

  bucketName = this.configService.get('AWS_BUCKET_NAME');
  s3 = new S3({
    credentials: {
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    },
  });

  async uploadPublicFile(file: Buffer, filename: string, userId: string) {
    try {
      const result = await this.s3
        .upload({
          Bucket: this.bucketName,
          Body: file,
          Key: filename,
          ContentDisposition: 'inline',
        })
        .promise();

      if (result && result?.Location) {
        await this.databaseService.userUploads.create({
          data: {
            publicUrl: result.Location,
            userId: userId,
            filename,
          },
        });
      }

      return result;
    } catch (error) {
      return error;
    }
  }

  async getPublicFile(filename: string) {
    try {
      const result = await this.s3
        .getObject({
          Bucket: this.bucketName,
          Key: filename,
        })
        .promise();
      return result.Body;
    } catch (error) {
      return error;
    }
  }

  async getUserFiles(userId: string) {
    try {
      const result = await this.databaseService.userUploads.findMany({
        where: {
          userId: userId,
        },
      });

      if (!result) {
        return [];
      }

      //change public url to signed url
      const signedUrls = await Promise.all(
        result.map(async (file) => {
          const signedUrl = await this.s3.getSignedUrlPromise('getObject', {
            Bucket: this.bucketName,
            Key: file.filename,
            Expires: 60 * 60 * 24 * 7,
          });
          return {
            ...file,
            publicUrl: signedUrl,
          };
        }),
      );

      return signedUrls;
    } catch (error) {
      return error;
    }
  }
}
