import { IsNotEmpty, IsString } from 'class-validator';
import { ImageUploadInfo } from './storage';
import { fileDefinition, FileDto } from './file';
import { Nested } from './nested';

const imageFormat = {
  ...fileDefinition,
  url: { type: String },
  width: { type: Number },
  height: { type: Number },
};
const imageFormats = {
  thumbnail: { type: imageFormat },
  small: { type: imageFormat },
};
export const imageDefinition = {
  ...fileDefinition,
  alternativeText: { type: String },
  formats: { type: imageFormats },
  width: { type: Number },
  height: { type: Number },
};
export type Image = Nested<typeof imageDefinition>;

export type ImageFormat = {
  url: string;
};

export type ImageFormats = {
  thumbnail: ImageUploadInfo;
  small: ImageUploadInfo;
};

export class ImageDto extends FileDto implements ImageUploadInfo {
  @IsString()
  @IsNotEmpty()
  alternativeText: string;
  formats?: ImageFormats;
  width: number;
  height: number;
}
