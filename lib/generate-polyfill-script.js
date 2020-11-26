function generateScript({
  useragent,
  userAgentsNotNeedingPolyfillSupportRegex,
}) {
  return useragent.match(userAgentsNotNeedingPolyfillSupportRegex)
    ? ''
    : `<script src="//wherever-you-hosted-the-built-output-of-src/index.js"></script>`;
}

module.exports = generateScript;
