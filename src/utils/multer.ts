import multer, {StorageEngine, FileFilterCallback} from 'multer'
import { extname } from "path";

const storage:StorageEngine = multer.diskStorage({})

const multerUploads = multer({
    storage,
    fileFilter: (req, file, cb:FileFilterCallback) =>{
        let fileExtension = extname(file.originalname)

       
        cb(null, true)
    }
})



export {multerUploads}