import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FilesService {
  uploadFile(file: Express.Multer.File, username: string, forWhat: string) {
    if (!file) {
      throw new Error('File not found');
    }
    const ext = path.extname(file.originalname);
    
    const now = new Date();
    const dateString = `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getFullYear()}`;

    
    const uniqueSuffix = Math.round(Math.random() * 1e9);
    const newFileName = `${forWhat}-${username}-${dateString}-${uniqueSuffix}${ext}`;

    const oldPath = file.path;
    const newPath = path.join(path.dirname(oldPath), newFileName);

    fs.renameSync(oldPath, newPath);

    return {
      filename: newFileName,
      path: `/uploads/${newFileName}`,
    };
  }
}
