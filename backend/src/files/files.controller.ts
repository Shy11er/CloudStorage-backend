import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  Get,
  BadRequestException,
  Query,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileStorage } from './storage';
import { UserId } from 'src/decorators/user-id.decorator';
import { FileType } from './entities/file.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('files')
@ApiTags('Files')
@UseGuards(AuthGuard)
@ApiBearerAuth()
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
  create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 })],
      }),
    )
    file: Express.Multer.File,
    @UserId() userId: number,
  ) {
    return this.filesService.create(file, userId);
  }

  @Get()
  getAll(@UserId() userId: number, @Query('type') fileType: FileType) {
    try {
      return this.filesService.getAll(userId, fileType);
    } catch (err) {
      return new BadRequestException(err);
    }
  }

  @Delete()
  remove(@UserId() userId: number, @Query('ids') ids: string) {
    return this.filesService.remove(userId, ids);
  }
}
