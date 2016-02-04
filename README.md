[![build status](https://secure.travis-ci.org/bebraw/segmentize.png)](http://travis-ci.org/bebraw/segmentize)
# segmentize - Simple segmentation useful for pagination

```javascript
expect(segmentize({
  page: 2,
  pages: pageAmount,
  beginPages: 2
})).to.deep.equal({
  beginPages: [0, 1],
  previousPages: [],
  centerPage: 2,
  nextPages: [3],
  endPages: []
});
```

See `./test.js` for more examples.

## Contributors

* [Artem Sapegin](https://github.com/sapegin) - `const` -> `var`. Safari needs this to work.

## License

*segmentize* is available under MIT. See LICENSE for more details.
