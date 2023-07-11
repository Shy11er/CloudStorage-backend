import { diskStorage } from 'multer';

const generateRandomId = () => {
  return Array(18)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
};

const randomFileName = (_, file, cb) => {
  const fileFormat = file.originalname.split('.').pop();

  cb(null, `${generateRandomId()}.${fileFormat}`);
};

export const fileStorage = diskStorage({
  destination: './uploads',
  filename: randomFileName,
});
