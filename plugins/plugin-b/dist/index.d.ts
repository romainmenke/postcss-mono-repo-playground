import type { PluginCreator } from 'postcss';
/** postcss-mono-repo-playground--plugin-b plugin options */
export type pluginOptions = {
    /** Preserve the original notation. default: false */
    preserve?: boolean;
    /** Replacement color */
    color?: string;
};
declare const creator: PluginCreator<pluginOptions>;
export default creator;
