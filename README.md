# via

## PROCESS

- take original video
- compress the video to 720p (/Users/piyusharora/projects/via/assets/temp/rishikesh-sample.mp4)
- get the url for 720p (https://test-v1.blr1.digitaloceanspaces.com/temp/rishikesh-sample-720p.mp4)
- run the workflow to generate media json (/Users/piyusharora/projects/via/assets/temp/rishikesh-transitions.json)
- load the json to render video in project (/Users/piyusharora/projects/via/web-workspace/apps/quick-reel-next/store/project.store.ts)
- check the video in the project page (http://localhost:3000/project)
- create a frames folder (/Users/piyusharora/projects/via/assets/temp/rishikesh-frames)
- update the folder and output path (/Users/piyusharora/projects/via/web-workspace/apps/exporter/src/exporter.ts)
- run the exporter which will capture frames and create video (/Users/piyusharora/projects/via/assets/temp/rishikesh-output.mp4)
- upload the output video (https://test-v1.blr1.digitaloceanspaces.com/temp/rishikesh-output.mp4)
- update the editor page url (/Users/piyusharora/projects/via/web-workspace/apps/quick-reel-next/app/templates/[id]/editor/page.tsx)
- attach audio (/Users/piyusharora/projects/via/assets/temp/rishikesh-output.mp4 ,https://test-v1.blr1.digitaloceanspaces.com/CMS/luxurious-hotel-highlights-reel-original-music.mp3 )
- final output https://test-v1.blr1.digitaloceanspaces.com/temp/rishikesh-output-with-audio.mp4

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
- create a common package that handles binary path and scripts path
- ability to update the description of the video
- improve progress on export specially at the end when 99% progress is done
- Make Application work on mobile web
- cleanup temp folders
- support filters in videos page like limit , pagination
- progress on adding video
- multiple videos add batching
- video preview stopped when we scroll the video
- Directly allow to download video
- Add debug config for node
- add video button only enable when can add video using guard
- Make reliable export
- Write all pngs in a folder in ffmpeg and clean it once done
- proper error notification system
- use enter key for forms to submit
- when select the text , surround it with the bounding box
- ability to create projects
- ability to convert project into template

## Immendiate Next Steps

- ability to change color of text
- ability to move the text around
- ability to scale the text
- ability to change the font of the text
- need to consider the position of text before exporting

## Helper Commands

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

# Sample videos

https://www.youtube.com/watch?v=h7alvfUTeqc
https://www.youtube.com/watch?v=-Ag_SJc661w
https://www.youtube.com/watch?v=JiENRbBH2D4
https://www.youtube.com/watch?v=i2wM0KCWMRw
https://www.youtube.com/watch?v=u6l5KUXn3JQ

## Rival Platforms

https://makereels.ai/en/reels/66f97902d8b56cd4d6154f91

## Media Store

https://www.pexels.com/search/family/

## TODO by preeti

- text font style
- font weight
- font underline
- transition
- background music
- own voice
