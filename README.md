# via

## TODO : Long Term

- get rid of node sdk too by using cloudinary
- add utility package for getting lodash getter , generate uuid (use common for now)
- clean the test db before running any tests
- run migrate fully via script
- support start and end trim video at the time of download
- client side form validation
- Reduce some states via reusable child machines
- Show progress on what exactlly is happening
- Create a prompt to help with updating the description of the video
- when video not found , add randomisation
- improve leaky tests with cleanup files
- Categorize uploads : 1. IMP (videos which has description) and 2. Rendered Videos ()
- get rid of false negatives
- inconsistent tests : valid small video , add one video
- create a common package that handles binary path and scripts path
- reduce the number of uploads
-

## Immendiate Next Steps

- ability to update the description of the video

outprocess

- ffmpeg -hide_banner -loglevel error -f rawvideo -vcodec rawvideo -pix_fmt rgba -s 180x320 -r 30000/1001 -i - -map 0:v:0 -vf format=yuv420p -vcodec libx264 -profile:v high -preset:v medium -crf 18 -movflags faststart -y out.mp4

frame size

- ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 /Users/piyusharora/projects/via/assets/sample-videos/1-sec.mp4

fps

```shell
ffprobe -v error -select_streams v:0 -show_entries stream=r_frame_rate -of default=noprint_wrappers=1:nokey=1 http://localhost:4000/uploads/1722237708740.mp4
```

ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames -of default=nokey=1:noprint_wrappers=1 /Users/piyusharora/projects/via/assets/sample-videos/1-sec.mp4

ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of default=noprint_wrappers=1 /Users/piyusharora/projects/via/assets/sample-videos/1-sec.mp4

ffprobe -v error -select_streams v:0 -show_entries stream=r_frame_rate -of default=noprint_wrappers=1:nokey=1 /Users/piyusharora/projects/via/assets/sample-videos/1-sec.mp4
