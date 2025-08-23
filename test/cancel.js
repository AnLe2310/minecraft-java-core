const { Launch, Mojang } = require('minecraft-java-core');

const test = new Promise(async (resolve) => {
    const launcher = new Launch();

    launcher.Launch({
        path: './minecraft',
        authenticator: await Mojang.login('ALR'),
        version: '1.16.5',
        intelEnabledMac: true,
        bypassOffline: true,
        memory: {
            min: '1G',
            max: '2G'
        }
    }).catch(error => {
        console.log(`Launch error: ${error.message || error}`);
    });

    launcher.on('progress', (progress, size) => console.log(`[DL] ${((progress / size) * 100).toFixed(2)}%`))
        .on('patch', pacth => process.stdout.write(pacth))
        .on('data', line => process.stdout.write(line))
        .on('close', () => console.log('Game exited.'))
        .on('error', error => console.log(`Launcher error: ${error.message || error}`));

    // Cancel after 20 seconds
    setTimeout(() => {
        console.log('Cancelling the launch...');
        launcher.cancel();
    }, 10000);

});

(async () => {
    let i = 1;
    const interval = setInterval(() => {
        console.log(i++);
    }, 1000);

    await test;
    clearInterval(interval);
})();