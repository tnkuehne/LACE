import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { enhancedImages } from '@sveltejs/enhanced-img';

export default defineConfig(async () => {
	const plugins = [enhancedImages(), sveltekit()];

	if (process.env.NODE_ENV !== 'production') {
		const { visualizer } = await import('rollup-plugin-visualizer');
		plugins.push(
			visualizer({
				emitFile: true,
				filename: 'stats.html'
			})
		);
	}

	return {
		plugins,
		test: {
			include: ['src/**/*.{test,spec}.{js,ts}']
		}
	};
});
