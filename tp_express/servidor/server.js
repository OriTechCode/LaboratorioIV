const express = require('express');
const path = require('path');

const createServer = () => {
    const app = express();
    const PORT = 3000;

    const distPath = path.join(__dirname, '../dist');

    app.use(express.static(distPath));

    app.use((req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
    });

    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
};

createServer();
