/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import { Multer } from 'multer';

@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadImage(file: Multer.File): Promise<string> {
    if (!file) {
      throw new Error('No file provided');
    }

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'subcategories',
        },
        (error, result) => {
          if (error || !result) {
            console.error('Cloudinary upload error:', error); // Log the error
            return reject(new Error('Cloudinary upload failed'));
          }
          console.log('Cloudinary upload result:', result); // Log the result
          resolve(result.secure_url);
        },
      );

      uploadStream.end(file.buffer);
    });
  }
}
