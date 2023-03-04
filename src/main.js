import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'Analog Clock App'
	}
});

export default app;