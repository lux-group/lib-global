Lib for expanding functionality and deduplicating code between services

## Example

```js
const { vendor } = require('lib-global')

if (vendor.requiresTravellerDetails('00128000018BZkIAAW')) {
  
}
       
```
## Publishing

Update index.d.ts to reflect new changes.
Run "yarn build" to recompile js with new changes before merging.
Update the version in package.json as part of your PR and CircleCI will do the rest.

