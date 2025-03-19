import express from 'express';

const app = express();

app.use(express.static('static_files'))

app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000/');
});
