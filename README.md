# polyfill-middleware-example

This is an example of an Express middleware that can be used to dynamically add a hosted polyfill bundle to only those users who require it.

It goes along with this blog post: xxx

It is an adaptation of a private repository, and is used only for example purposes. The original package this example is based on was developed by [Mungo Dewar](https://github.com/DewarM) and [Tat Jhetson](???).

## Usage

The middleware provided by the package adds `.polyfill` to the request which provides a `script` tag linking to a externally hosted polyfill or `''` depending on if the current user agent requires a polyfill.

```js
const polyfill = require('@skyscanner/polyfill-middleware');

const app = express();

app.use(polyfill());

app.get('*', (req, res) => {
  console.log(req.polyfill.script); // <script src="..."></script>
});
```

The returned value can then be safely inlined in the HTML document returned to the user; it will either be the polyfill or a harmless empty string.

## How is it decided which browsers receive the polyfill?

Thinking about the aim that 'polyfills must be provided for ALL browsers that require them' we can inverse this and use logic that 'if we know x browsers do NOT need a polyfill do not provide one'.

We use `browserslist-useragent-regexp` to determine this. We pass the set list of features we MUST support to this library which returns us a regex of User Agents that DO support the feature set: "User Agents Not Needing Polyfill Support Regex".

On a per request basis we can then match the current User Agent against this list.

If it matches then it does not need the polyfill, so we return an empty string rather than a `script` tag.

If it does not match it does need the polyfill, so we return the `script` tag as above.### How is it decided which browsers receive the polyfill?

Thinking about the aim that 'polyfills must be provided for ALL browsers that require them' we can inverse this and use logic that 'if we know x browsers do NOT need a polyfill do not provide one'.

We use `browserslist-useragent-regexp` to determine this. We pass the set list of features we MUST support to this library which returns us a regex of User Agents that DO support the feature set: "User Agents Not Needing Polyfill Support Regex".

On a per request basis we can then match the current User Agent against this list.

If it matches then it does not need the polyfill, so we return an empty string rather than a `script` tag.

If it does not match it does need the polyfill, so we return the `script` tag as above.

## Static Polyfill Generation

The feature set of the polyfill bundle is defined at `src/index.js`.

When `npm run build` is ran this builds the polyfill which can then be hosted externally, for example published to S3.

New releases of the polyfill-middleware npm package can then deliver new versions of the polyfill to consumers.
