const express = require ('express');
const helmet = require ('helmet');
const cors = require ('cors');
const app = express();
const PORT = 8080;
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.get('/', (request, response) => {
    response.send('<h1>MI API</h1>')
});

app.use('/api', require('./routes'));//Toma de referencia el archivo index

app.listen(PORT, () => {
    console.log(`Running on ${PORT}`);
});