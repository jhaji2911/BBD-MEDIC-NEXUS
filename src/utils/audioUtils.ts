import util from 'util';

const exec = util.promisify(require('child_process').exec);

export async function convertWebmToWav(inputPath, outputPath) {
    try {
      const command = `ffmpeg -i ${inputPath} -ar 16000 -ac 1 ${outputPath}`;
      const { stdout, stderr } = await exec(command);
  
      if (stderr) {
        console.error('FFmpeg error:', stderr);
      }
      console.log('FFmpeg output:', stdout);
    } catch (error) {
      console.error('Conversion error:', error);
    }
  }

 export function extractSpokenText(transcription) {
    // Split the transcription by newline characters
    const lines = transcription.split('\n');
  
  // Use a regular expression to match and remove the timestamp
  const textLines = lines.map(line => line.replace(/\[\d{2}:\d{2}:\d{2}\.\d{3} --> \d{2}:\d{2}:\d{2}\.\d{3}\]\s*/, ''));

  // Join the remaining lines into a single string
  const spokenText = textLines.join(' ').trim();

  return spokenText;
  }

