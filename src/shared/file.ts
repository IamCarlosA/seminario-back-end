import { IsNotEmpty, IsString } from 'class-validator';
import { Nested } from './nested';
import { UploadInfoClass } from './storage';

export const fileDefinition = {
  name: { type: String },
  url: { type: String },
  size: { type: Number },
  path: { type: String },
  hash: { type: String },
  ext: { type: String },
  mimeType: { type: String },
};
export type File = Nested<typeof fileDefinition>;

export class FileDto extends UploadInfoClass {
  @IsString()
  @IsNotEmpty()
  name: string;
  file: Express.Multer.File;
}

export class DocumentsOzonerDto extends UploadInfoClass {
  @IsString()
  @IsNotEmpty()
  type: string;

  docs: FileDto[];
}

export class FileDeleteDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
