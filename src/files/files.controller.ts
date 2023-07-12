import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  Get,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileStorage } from './storage';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('files')
@ApiTags('Files')
@UseGuards(JwtAuthGuard)
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: fileStorage,
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 })],
      }),
    )
    file: Express.Multer.File,
  ) {
    return file;
  }

  @Get()
  getAll() {
    try {
      return this.filesService.getAll();
    } catch (err) {
      return new BadRequestException(err);
    }
  }
}
