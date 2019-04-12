Lib for expanding functionality and deduplicating code between services

## Example

```js
const { vendor } = require('lib-global')

if (vendor.requiresTravellerDetails('00128000018BZkIAAW')) {
  
}
       
```
## Release

Use `npm` to patch, minor or whatever version:

```
npm version patch -m "release version %s"
git push && git push --tags
```

https://docs.npmjs.com/cli/version

