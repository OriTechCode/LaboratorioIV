import fs from 'fs/promises';
import readline from 'readline/promises';  
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv))
.option('file', {
    alias: 'f',
    type: 'string',
    description: 'Nombre del archivo JSON',
    default: 'productos.json',
})
.argv;

const fileName = argv.file;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function solicitarDatos() {

    try {
        const nombre = await rl.question('Ingrese el nombre del producto: ');
        const precio = parseFloat(await rl.question('Ingrese el precio del producto: '));
        const cantidad = parseInt(await rl.question('Ingrese la cantidad del producto: '), 10);
        rl.close();
        return { nombre, precio, cantidad };
    } catch (error) {
        console.error('Error al solicitar datos:', error.message);
        process.exit(1);
    }
}

async function leerArchivo(fileName) {
    try {
        const data = await fs.readFile(fileName, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
        return []; 
    }
    throw error;
    }
}

async function escribirArchivo(fileName, productos) {
    await fs.writeFile(fileName, JSON.stringify(productos, null, 2), 'utf-8');
}

async function main() {
    try {
        console.log(`Archivo de destino: ${fileName}`);
        const nuevoProducto = await solicitarDatos();
        const productos = await leerArchivo(fileName);
        productos.push(nuevoProducto);
        await escribirArchivo(fileName, productos);
        console.log('Producto guardado exitosamente.');
        console.log('Contenido actual del archivo JSON:', productos);
    } catch (error) {
        console.error('Ocurrió un error:', error.message);
    }
}

main();
