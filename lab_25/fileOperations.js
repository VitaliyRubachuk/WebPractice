const fs = require('fs');

// Читання файлу
fs.readFile('info.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
});

// Запис у файл
const textToWrite = 'New text to write to the file.';
fs.writeFile('info.txt', textToWrite, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('File has been written');
});
