# attt-album

## Encode command sample

```sh
ffmpeg -i original.mp4 -codec: copy -start_number 0 -hls_time 10 -hls_list_size 0 -f hls output.m3u8
```
