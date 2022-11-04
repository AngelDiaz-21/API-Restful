const express = require ('express');
const app = express();
const PORT = 8080;
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.get('/', (request, response) => {
    response.send('<h1>MI API</h1>')
});

app.use('/api', require('./routes'));

app.listen(PORT, () => {
    console.log(`Running on ${PORT}`);
});