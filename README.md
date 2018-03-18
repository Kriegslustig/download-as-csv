# Download as CSV

Create a Data URI from an array of objects.

## Why would I need a library for this?!

TBD

## Usage

```js
import createDataUri from 'download-as-csv'

const data = [
  { origin: '🇨🇭', landmark: '🗻' },
  { origin: '🇩🇪', landmark: '🗼' }, // (was aiming for the berlin TV tower)
]

const dataUri = createDataUri(data, /* options */)
```

## Options

### `separator = ','`

The field separator.

### `lineBreak = '\n'`

The line separator

### `header = true`

Pass it a boolean to enable or disable rendering a header on the first line.

You may pass an array of keys. In that keys it will only take these keys in the given order and print a header.
