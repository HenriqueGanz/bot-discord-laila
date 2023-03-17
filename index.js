const {Client, Events, GatewayIntentBits, Collection } = require('discord.js');

//dotenv
const dotenv = require('dotenv');
dotenv.config()
const { TOKEN, CLIENT_ID, GUILD_ID} = process.env

//importacao dos comandos
const fs = require('node:fs');
const path = require('node:path');

const commandsPath = path.join(__dirname,"commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

//Criacao de nova instancia
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection()

 for (const file of commandFiles){
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)

    if ("data" in command && "execute" in command) {
         client.commands.set(command.data.name, command)
    } else {
        console.log(`Esse comando em ${filePath} esta com "data" ou "execute" ausentes`)
     }
 }

// Quando o client estiver pronto, rodar esse codigo
// Usamos 'C' para o parametro do evento continuar separado do client ja definido
client.once(Events.ClientReady, c => {
    console.log(`Pronto! Login realizado como ${c.user.tag}`)
});

// Entre no discord com o token do seu client
client.login(TOKEN);