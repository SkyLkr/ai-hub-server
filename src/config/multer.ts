import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

export const multerConfig: multer.Options = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'models'),
    filename: (request, file, callback) => {
      try {
        const randomPrefix = crypto.randomBytes(8).toString('hex');

        const filename = `${randomPrefix}-${file.originalname}`;

        callback(null, filename);
      } catch (error) {
        callback(error, null);
      }
    },
  }),
};
