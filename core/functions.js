// Modules
const Discord = require( 'discord.js' );
const archive = require( './globalArchive.js' );

/**
 * @param {string} name 
 * @param {Discord.Client} bot
 * @returns {any}
 */
function getCommand( commandName, bot ) {
	/** boolean */
	let command = bot.commands.get( commandName );
	if ( !command )
	{
		command = bot.commands.find( cmd => cmd.alias && cmd.alias.includes( commandName ) );	
	}

	return command;
}

/**
 * @param {string} commandName 
 * @param {Discord.Message} message
 * @param {Discord.Client} userRoles 
 * @returns {boolean}
 */
function checkAccessLevel( commandName, message )
{
	const roles = archive.commands[commandName].rolesAllowed;
	for ( const role of roles )
	{
		const roleAllowed = ( message.member.roles.cache.find( r => r.name === role ) );
		if ( roleAllowed ) return true;
	}
	return false;
}

module.exports = { getCommand, checkAccessLevel };