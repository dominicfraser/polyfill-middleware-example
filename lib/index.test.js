const polyfillMiddleware = require('./index');

jest.mock('./user-agents-regex', () => /super-modern/, { virtual: true });

describe('polyfillMiddleware', () => {
  it('should return empty string when ua is supported', () => {
    const headers = {
      'user-agent': 'super-modern',
    };
    const req = { headers };

    polyfillMiddleware()(req, null, () => 0);

    expect(req.polyfill.script).toEqual('');
  });

  it('should return script string when ua is not supported', () => {
    const headers = {
      'user-agent': 'legacy-browser',
    };
    const req = { headers };

    polyfillMiddleware()(req, null, () => 0);

    expect(req.polyfill.script).toMatch(/^<script/);
  });
});
