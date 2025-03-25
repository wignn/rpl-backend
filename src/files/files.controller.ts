import { Controller, Get, Post, Param, UploadedFile, UseInterceptors, Res, Body, Delete, HttpCode } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';
import { ApiResponse } from '@nestjs/swagger';
import { UploadFileRequest } from 'src/models/files.model';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'File successfully uploaded',
  })
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UploadFileRequest,
  ) {
    return this.filesService.uploadFile(file, body.username, body.forWhat);
  }
 
  @Get(':filename')
  getFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = path.join(__dirname, '../../uploads', filename);
    if (fs.existsSync(filePath)) {
      return res.sendFile(filePath);
    } else {
      return res.status(404).json({ message: 'File not found' });
    }
  }

  @Delete(':filename')
  deleteFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = path.join(__dirname, '../../uploads', filename);
    if (fs.existsSync(filePath
    )) {
      fs.unlinkSync(filePath
      );
      return res.json({ message: 'File deleted' });
    } else {
      return res.status(404).json({ message: 'File not found'});
    }
  }
}
