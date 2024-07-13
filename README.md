# lenscast

Serve images and videos directly from filesystem to a browser

## Usage

Default **Port**: `9000`

**Environment Variables**

- `LENSCAST_PORT` -- Overwrite port via environment

### Setup

```
pnpm i
pnpm run build
pnpm run start -- port=9000
```

## Development

### Documentation

**Setup**

```
pnpm i -g apidoc
```

**Generate docs**

```
pnpm run docs:generate
```

## TODO

- [ ] Setup
  - [x] git repo
  - [x] pnpm
  - [x] express
  - [x] nodemon
  - [x] apidoc
- [ ] Configuration
  - [ ] Base directory
  - [ ] Video autoplay
  - [ ] Slideshow: Display photo for n seconds
- [ ] List files
  - [ ] File names
  - [ ] Preview (Thumbnails)
- [ ] Thumbnails
- [ ] Overlay (full-screen)
  - [ ] Controls
    - [ ] Close
    - [ ] Forward
    - [ ] Back
  - [ ] Photos
  - [ ] Videos
- [ ] Slideshow
  - [ ] Photos
  - [ ] Videos
- [ ] Responsiveness (Mobile / TV friendliness)

## Contributing

See [CONTRIBUTING](https://github.com/frncsdrk/lenscast/blob/main/CONTRIBUTING.md)

## Credits

See [CREDITS](https://github.com/frncsdrk/lenscast/blob/main/CREDITS)

## License

Unlicense (c) 2024 frncsdrk and contributors
