Lib for expanding functionality and deduplicating code between services

## Example

```js
const { vendor } = require('lib-global')

if (vendor.requiresTravellerDetails('00128000018BZkIAAW')) {
  
}
       
```
## Release

This package takes advantage of the github release process.

Follow these steps:
- Update the version in your `package.json` as part of your PR
- Once you've merged, find the 'releases' section create a new release (`Draft a new release` button)
    - Alternatively, for this repo, go to https://github.com/lux-group/lib-global/releases/new
- Set `Tag version` to be the same as the version you put in `package.json`
- Set a title
- Set a description
- Click 'Publish Release'

Done.
