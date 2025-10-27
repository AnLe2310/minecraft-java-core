import { Launch, Mojang } from './Index';

(async () => {
	const launcher = new Launch();

	await launcher.Launch({
		path: './minecraft',
		authenticator: await Mojang.login('Luuxis'),
		version: 'latest_release',
		bypassOffline: true,
		loader: {
			path: './',
			type: 'neoforge',
			build: 'latest',
			enable: true,
		},
		memory: {
			min: '1G',
			max: '2G',
		},
		instance: '../versions/test-instance',
		mcp: undefined,
		verify: false,
		ignored: [],
		JVM_ARGS: [],
		GAME_ARGS: [],
		java: {
			path: undefined,
			version: undefined,
			type: 'jre',
		},
		screen: {
			width: 350,
			height: 200,
			fullscreen: false,
		},
	});

	launcher
		.on('progress', (progress, size) => console.log(`[DL] ${((progress / size) * 100).toFixed(2)}%`))
		.on('patch', (pacth) => process.stdout.write(pacth))
		.on('data', (line) => process.stdout.write(line))
		.on('close', () => console.log('Game exited.'));
})();
