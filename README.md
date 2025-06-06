# attt-album

## Setup

```sh
pnpm i
pnpm wrangler types # run this after changes wrangler.toml
direnv allow
pnpm wrangler login
```

## Encode command sample

```sh
ffmpeg -i original.mp4 -codec: copy -start_number 0 -hls_time 10 -hls_list_size 0 -f hls output.m3u8
```
