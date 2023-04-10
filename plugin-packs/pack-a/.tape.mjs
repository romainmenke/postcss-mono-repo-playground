import { postcssTape } from '@rmenke/postcss-mono-repo-playground--postcss-tape';
import plugin from '@rmenke/postcss-mono-repo-playground--pack-a';

postcssTape(plugin)({
	basic: {
		message: "supports basic usage",
	},
	document: {
		postcssSyntaxHTML: true,
		message: "supports document usage",
	},
	'examples/example': {
		message: 'minimal example',
	},
	'examples/example:preserve-true': {
		message: 'minimal example',
		options: {
			preserve: true
		}
	},
});
