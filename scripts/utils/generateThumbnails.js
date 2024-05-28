const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = 'assets/photographers';
const outputDir = 'assets/thumbnails';

const thumbnailWidth = 150;
const thumbnailHeight = 150;

// Ensure the output directory exists
if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
}

// Read the input directory and process each image file
fs.readdir(inputDir, (err, files) => {
    if (err) {
        console.error('Error reading input directory', err);
        return;
    }

    files.forEach(file => {
        const inputFile = path.join(inputDir, file);
        const outputFile = path.join(outputDir, `thumb_${file}`);

        sharp(inputFile)
            .resize(thumbnailWidth, thumbnailHeight)
            .toFile(outputFile, (err, info) => {
                if (err) {
                    console.error('Error creating thumbnail for', file, err);
                } else {
                    console.log('Created thumbnail for', file, info);
                }
            });
    });
});
