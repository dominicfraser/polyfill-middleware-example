const userAgentsNotNeedingPolyfillSupport = require('./user-agents-regex'); // eslint-disable-line import/no-unresolved
const generateScript = require('./generate-polyfill-script');

// Creates polyfill middleware function that adds .polyfill to the request which provides a script tag linking to an externally hosted polyfill or '' depending on if the current user agent requires a polyfill.
const polyfillMiddleware = () => (req, _, next) => {
  const useragent = req.headers['user-agent'] || '';

  req.polyfill = {
    script: generateScript({
      useragent,
      userAgentsNotNeedingPolyfillSupport,
    }),
  };
  next();
};

module.exports = polyfillMiddleware;
