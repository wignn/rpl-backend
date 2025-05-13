import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FilesService {
  uploadFile(file: Express.Multer.File) {
    if (!file) {
      throw new Error('File not found');
    }

    const ext = path.extname(file.originalname);

    const now = new Date();
    const dateString = `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getFullYear()}`;

    const fixedForWhat = 'greenakostjaya';
    const uniqueSuffix = Math.round(Math.random() * 1e9);
    const newFileName = `${fixedForWhat}-${dateString}-${uniqueSuffix}${ext}`;

    const uploadDir = path.resolve('/usr/src/app/uploads');

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const newPath = path.join(uploadDir, newFileName);
    fs.renameSync(file.path, newPath);

    return {
      filename: newFileName,
      path: `uploads/${newFileName}`, 
    };
  }
}
