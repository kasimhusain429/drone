const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const path = require('path');
const fs = require('fs');

ffmpeg.setFfmpegPath(ffmpegPath);

const inputPath = path.join(__dirname, 'Quadcopter_drone_moving_on_green_20260921142342.mp4');
const outputDir = path.join(__dirname, 'public', 'frames');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('Starting frame extraction with chroma key...');

ffmpeg(inputPath)
  .outputOptions([
    '-vf', 'crop=1400:720:(in_w-1400)/2:(in_h-720)/2,chromakey=0x00ff00:0.2:0.1,despill=green',
    '-c:v', 'libwebp',
    '-lossless', '0',
    '-compression_level', '4',
    '-q:v', '70',
    '-preset', 'default',
    '-an', // No audio
    '-pix_fmt', 'yuva420p' // Ensure alpha channel is preserved
  ])
  .output(path.join(outputDir, 'frame_%04d.webp'))
  .on('start', (commandLine) => {
    console.log('Spawned Ffmpeg with command: ' + commandLine);
  })
  .on('progress', (progress) => {
    if(progress.percent) console.log('Processing: ' + Math.round(progress.percent) + '% done');
  })
  .on('end', () => {
    console.log('Frame extraction finished successfully!');
  })
  .on('error', (err, stdout, stderr) => {
    console.error('Error during extraction:', err.message);
    console.error('ffmpeg stderr:', stderr);
  })
  .run();
