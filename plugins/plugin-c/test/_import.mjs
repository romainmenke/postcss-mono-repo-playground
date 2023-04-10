import assert from 'assert';
import plugin from '@rmenke/postcss-mono-repo-playground--plugin-c';
plugin();

assert.ok(plugin.postcss, 'should have "postcss flag"');
assert.equal(typeof plugin, 'function', 'should return a function');
