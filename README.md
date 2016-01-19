[![build status](https://secure.travis-ci.org/bebraw/segmentize.png)](http://travis-ci.org/bebraw/segmentize)
# segmentize - Simple segmentation useful for pagination

```javascript
const segments = segmentize({
  page: 5,
  pages: 15,
  sidePages: 2,
  beginPages: 3,
  endPages: 1
});

/*
[
  [0, 1, 2],
  [3, 4, 5, 6, 7],
  [14]
]
*/
```

See `./test.js` for more examples.

## License

*segmentize* is available under MIT. See LICENSE for more details.
