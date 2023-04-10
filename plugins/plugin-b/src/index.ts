import type { PluginCreator } from 'postcss';
import { identify } from '@rmenke/postcss-mono-repo-playground--package-a';

/** postcss-mono-repo-playground--plugin-b plugin options */
export type pluginOptions = {
	/** Preserve the original notation. default: false */
	preserve?: boolean,
	/** Replacement color */
	color?: string,
};

const creator: PluginCreator<pluginOptions> = (opts?: pluginOptions) => {
	const options: pluginOptions = Object.assign(
		// Default options
		{
			color: null,
			preserve: false,
		},
		// Provided options
		opts,
	);

	console.log(identify());

	return {
		postcssPlugin: 'postcss-mono-repo-playground--plugin-b',
		Declaration(decl) {
			if (decl.value === 'purple') {
				// Determine the new value.
				let newValue = 'orange';
				if (options.color) {
					newValue = options.color;
				}

				// Check if it is different from the current value.
				if (newValue === decl.value) {
					return;
				}

				// Insert the new value before the current value.
				decl.cloneBefore({
					prop: 'color',
					value: newValue,
				});

				// If the current value is preserved we are done and return here.
				if (options.preserve) {
					return;
				}

				// If the current value is not preserved we remove it.
				decl.remove();
			}
		},
	};
};

creator.postcss = true;

export default creator;
