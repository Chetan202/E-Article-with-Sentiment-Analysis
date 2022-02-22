import mongoose from 'mongoose';

const Connection = async (username, password) => {
    const URL = `mongodb://user:codeforarticle@articleweb-shard-00-00.jgxd8.mongodb.net:27017,articleweb-shard-00-01.jgxd8.mongodb.net:27017,articleweb-shard-00-02.jgxd8.mongodb.net:27017/E-ARTICLE?ssl=true&replicaSet=atlas-vun5zn-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try {
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting to the database ', error);
    }
};

export default Connection;