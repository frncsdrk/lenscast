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
  - [ ] [i18next](https://www.npmjs.com/package/i18next-http-middleware)
- [ ] Configuration
  - [x] Base directory
  - [x] Video autoplay
  - [x] Slideshow: Display photo for n seconds
- [ ] List files
  - [x] File names
  - [x] Differentiate between directories and files
  - [ ] Preview (Thumbnails)
- [ ] Thumbnails
- [ ] Overlay (full-screen)
  - [ ] Controls
    - [ ] Close
    - [x] Forward
    - [x] Back
  - [ ] Photos
  - [ ] Videos
- [ ] Slideshow
  - [x] Photos
  - [x] Videos
- [ ] Responsiveness (Mobile / TV friendliness)

## Thumbnails

[Module: NPM](https://www.npmjs.com/package/image-thumbnail)

## Resources

- [samplelib](https://samplelib.com/)

## Contributing

See [CONTRIBUTING](https://github.com/frncsdrk/lenscast/blob/main/CONTRIBUTING.md)

## Credits

See [CREDITS](https://github.com/frncsdrk/lenscast/blob/main/CREDITS)

## License

Unlicense (c) 2024 frncsdrk and contributors
