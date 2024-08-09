# lenscast

Serve images and videos directly from filesystem to a browser

## Usage

Default **Port**: `9000`

### Configuration

**Environment Variables**

- `LENSCAST_PORT` -- Overwrite port via environment

**Configuration Files**

*lenscast* uses the [config package]().
Add a file called `local.EXT`, e.g. `local.yml` like described [here](https://github.com/node-config/node-config/wiki/Configuration-Files).

### Deployment

**Quick**

```
pnpm i
pnpm run start -- port=9000
```

**pm2**

```
pnpm i -g pm2
pnpm i
pm2 start bin/www
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

## Why?

### Usecase

The goal with this is to configure a Raspberry Pi with an external hard drive, optional Samba share and a Node.js installation
with reverse proxy to serve images and videos in a simple way in a home network.
I consider a home network relatively safe and photos and videos as non-sensitive data, thus there is no need for authentication,
user-management or RBAC and whatnot.
There is probably a considerable amount of data but still manageable via the good old filesystem and the help of modern hardware, i.e. SSDs.
There is no need for fancy stuff like sorting photos by faces or locations. **The main purpose is to sort images and videos into directories
and present them as a slideshow.** Thus no AI, databases or external APIs are necessary.

### Code

The code is certainly not optimal but it works. The project is practical and my approach to the code is the same. Still, contributions
and improvements are very welcome.

## TODO

- [ ] Setup
  - [x] git repo
  - [x] pnpm
  - [x] nodemon
  - [x] pm2
  - [x] express
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
    - [ ] Forward
    - [ ] Back
    - [ ] Play / Pause
  - [x] Photos
  - [x] Videos
- [ ] Detail page
  - [x] Photos
  - [x] Videos
  - [x] Controls
    - [x] Back
- [x] Slideshow
  - [x] Photos
  - [x] Videos
  - [x] Back
    - [x] Close
    - [x] Forward
    - [x] Back
    - [x] Play / Pause
- [ ] Responsiveness (Mobile / TV friendliness)
  - [x] meta scale to device width
- [ ] Browsers
  - [ ] Amazon Silk -- Problems with slideshow and icons
  - [ ] Opera One

## Thumbnails

[Module: NPM](https://www.npmjs.com/package/image-thumbnail)

## Resources

- [feathericons](https://feathericons.com/)
- [samplelib](https://samplelib.com/)
- [Sample Files](https://getsamplefiles.com/)

## Contributing

See [CONTRIBUTING](https://github.com/frncsdrk/lenscast/blob/main/CONTRIBUTING.md)

## Credits

See [CREDITS](https://github.com/frncsdrk/lenscast/blob/main/CREDITS)

## License

Unlicense (c) 2024 frncsdrk and contributors
