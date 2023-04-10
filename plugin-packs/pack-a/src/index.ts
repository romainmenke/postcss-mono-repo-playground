import type { PluginCreator } from 'postcss';
import pluginA from '@rmenke/postcss-mono-repo-playground--plugin-a';
import pluginB from '@rmenke/postcss-mono-repo-playground--plugin-b';

const creator: PluginCreator<never> = () => {
	return {
		postcssPlugin: 'postcss-mono-repo-playground--pack-a',
		plugins: [
			pluginA(),
			pluginB(),
		],
	};
};

creator.postcss = true;

export default creator;
