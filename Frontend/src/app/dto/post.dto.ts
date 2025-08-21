export interface PostDto {
  title: string;
  guest1?: string;
  guest1UserId?: string;
  guest2?: string;
  guest2UserId?: string;
  description: string;
  youTubeLink?: string;
  createdAt?: Date;
  updatedAt?: Date;

  publishedDate?: Date;
  published?: boolean;

  image?: string;
  audio?: string;
  transcript?: string;
}
