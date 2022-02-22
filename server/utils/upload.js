import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';

const storage = new GridFsStorage({
    url: `mongodb://user:user01@blogmp2-shard-00-00.xfkcp.mongodb.net:27017,blogmp2-shard-00-01.xfkcp.mongodb.net:27017,blogmp2-shard-00-02.xfkcp.mongodb.net:27017/BLOGmp2?ssl=true&replicaSet=atlas-xag8sq-shard-0&authSource=admin&retryWrites=true&w=majority`,
    // url: 'mongodb://localhost:27017/image-upload',
    options: { useUnifiedTopology: true, useNewUrlParser: true },
    file: (request, file) => {
        const match = ["image/png", "image/jpg"];

        if(match.indexOf(file.memeType) === -1) 
            return`${Date.now()}-blog-${file.originalname}`;

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
});

export default multer({storage}); 