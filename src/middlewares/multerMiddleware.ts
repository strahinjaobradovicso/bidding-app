import multer from 'multer';
import { v4 as uuid } from 'uuid'

const storage:any = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, uuid())
    }
})

export const multerMiddleware = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if(
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg'
        ) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
})
