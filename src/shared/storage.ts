import { Readable } from 'stream';

export interface UploadInfo {
  url: string;
  size: number;
  path: string;
  hash: string;
  ext: string;
  mimeType: string;
}
export class UploadInfoClass implements UploadInfo {
  url: string;
  size: number;
  path: string;
  hash: string;
  ext: string;
  mimeType: string;
}
export interface ImageUploadInfo extends UploadInfo {
  width: number;
  height: number;
}

export type FileToUpload = {
  path?: string;
  originalname: string;
  filename: string;
  body?: Readable;
};

export type ImagesUploadInfo = {
  original: ImageUploadInfo;
  small: ImageUploadInfo;
  thumbnail: ImageUploadInfo;
};
