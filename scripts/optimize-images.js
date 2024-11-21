const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../src/assets');
const outputDir = path.join(__dirname, '../src/assets/optimized');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

async function optimizeImages() {
    try {
        const files = fs.readdirSync(inputDir);

        for (const file of files) {
            if (file.match(/\.(jpg|jpeg|png|webp)$/i)) {
                const inputPath = path.join(inputDir, file);
                const outputPath = path.join(outputDir, `${path.parse(file).name}.webp`);

                console.log(`Optimizing: ${file}`);

                await sharp(inputPath)
                    .webp({ quality: 80, effort: 6 })
                    .resize(2000, 2000, {
                        fit: 'inside',
                        withoutEnlargement: true
                    })
                    .toFile(outputPath);

                const stats = fs.statSync(inputPath);
                const optimizedStats = fs.statSync(outputPath);
                const savings = ((stats.size - optimizedStats.size) / stats.size * 100).toFixed(2);

                console.log(`✓ Saved ${savings}% - Output: ${outputPath}`);
            }
        }
        console.log('Image optimization complete!');
    } catch (error) {
        console.error('Error optimizing images:', error);
        process.exit(1);
    }
}

optimizeImages();