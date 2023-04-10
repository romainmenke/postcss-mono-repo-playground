export const externalsForCLI = [
	'fs',
	'https',
	'path',
	'url',

	'postcss',
	/^postcss-\d\.\d$/,
	/^postcss\/lib\/*/,
	'postcss-html',

	'@rmenke/postcss-mono-repo-playground--package-a',
	'@rmenke/postcss-mono-repo-playground--plugin-a',
	'@rmenke/postcss-mono-repo-playground--plugin-b',
];

export const externalsForPlugin = [
	'assert',
	'fs',
	'https',
	'module',
	'path',
	'url',

	'postcss',
	/^postcss-\d\.\d$/,
	/^postcss\/lib\/*/,
	'postcss-html',

	'@rmenke/postcss-mono-repo-playground--package-a',
	'@rmenke/postcss-mono-repo-playground--plugin-a',
	'@rmenke/postcss-mono-repo-playground--plugin-b',
];

export const externalsForBrowser = [];
