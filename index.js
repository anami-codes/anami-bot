// Modules
const Discord = require( 'discord.js' );

// Core
const bot = new Discord.Client();
const config = require( './config.json' );
const archive = require( './core/globalArchive.js' );
const { Console } = require('console');

bot.commands = new Discord.Collection();

process.on( 'uncaughtException', function( err ) {
	Console.log('Caught exception: ' + err) ;
	throw err;
});

bot.once( 'ready', () => {
	archive.init( bot );
	console.log( 'Ready!' );
});

bot.on( 'message', message => {

	// Check 1: Isn't bot
	if ( message.author.bot ) return;

	if ( !message.content.startsWith( config.prefix ) ) return;

	const args = message.content.slice( config.prefix.length ).trim().split( / +/ );
	const commandName = args.shift().toLowerCase();
	
	const command = archive.functions.getCommand( commandName, bot );

	if ( command ) command.execute( message, args );

} );

bot.on('guildMemberAdd', member => {
	Console.log( member.displayName );
});

bot.login( config.token );