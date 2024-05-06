/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				accent: 'var(--color-accent)',
				drizzy: 'var(--color-drizzy)',
				kdot: 'var(--color-kdot)',
				active: 'var(--color-active)'
			}
		}
	},
	plugins: []
};
