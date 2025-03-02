// export const makeVideo = () => {
//   return new Promise<void>(async (resolve, reject) => {
//     try {
//       const command = `ffmpeg -y -i ${path.join(FRAMES_FOLDER_PATH, "%d.png")} -framerate ${FPS} -c:v libx264 -pix_fmt yuv420p ${OUTPUT_PATH}`;

//       console.log(command);

//       exec(command, (error, stdout, stderr) => {
//         if (error) {
//           console.error(`Error: ${error.message}`);
//           return reject(error);
//         }
//         if (stderr) {
//           console.error(`FFmpeg stderr: ${stderr}`);
//           return reject(stderr);
//         }
//         console.log(stdout);
//         return resolve();
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   });
// };
