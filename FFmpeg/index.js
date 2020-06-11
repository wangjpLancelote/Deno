const ffmpeg = require('fluent-ffmpeg');

const commend = ffmpeg('').outputOptions([]).on('start', (str) => {
    console.log('转换任务开始', str);
}).on('progress', (progress) => {
    console.log(`转换任务进行中:${progress.percent}%`);
})
.on('end', () => {
    console.log('转换任务完成');
})
.save('test.avi');

/**
 * outputOptions参数：
 * [
  '-option1',
  '-option2 param2',
  '-option3',
  '-option4 param4'
]
 */