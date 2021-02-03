module.exports = {
	name: 'base',
	alias: [],
	listName: '',
	description: 'Comando base.',
	needsArgs: true,
	rolesAllowed: ['594015137967374336'],
	botUI: false,
	serverOnly: true,
	testOnly: true,
	usage: '',
	execute( message, args ) {
		message.channel.send( `Arguments: \`${args}\`` );
	},
};