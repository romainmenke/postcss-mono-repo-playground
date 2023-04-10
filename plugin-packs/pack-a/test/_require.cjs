const assert = require('assert');
const plugin = require('@rmenke/postcss-mono-repo-playground--pack-a');
plugin();

assert.ok(plugin.postcss, 'should have "postcss flag"');
assert.equal(typeof plugin, 'function', 'should return a function');
