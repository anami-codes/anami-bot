// Modules
const Discord = require( 'discord.js' );
const { readdirSync } = require('fs-extra');
const asciiTable = require('ascii-table');
const Sequelize = require( 'sequelize' );

// JS Files
const functions = require( './functions.js' );

// Enums
const DBAction = {
	ADD: 'Add',
	DELETE: 'Delete',
	MODIFY: 'Modify',
	READ: 'Read',
};

// Archives
const commands	= [];
const DBs		= {};
const scripts	= {};
const jsons		= {};
const cooldowns	= {};

const DBConfig = new Sequelize({
	dialect: 'sqlite',
	storage: 'anami-bot.db',
});

/**
 * @param {Discord.Client} bot
 * @returns {void}
 */
function init( bot )
{
	initCommands( bot );
	initDBs();
}

module.exports = { init, functions, DBs, scripts, jsons, cooldowns, DBAction, DBConfig };

// Variables
const table = new asciiTable('Commands');
table.setHeading('Command', 'Load status');

/**
 * @param {Discord.Client} bot
 * @returns {void}
 */
function initCommands( bot )
{
	/** {number} */
	let index = 0;
	readdirSync( './commands/' ).forEach( dir => {
		const files = readdirSync( `./commands/${dir}/` ).filter(file => file.endsWith( '.js' ));
		commands[index] = dir;
	
		for ( const file of files ) {
			const pull = require(`../commands/${dir}/${file}`);

			if ( file === `${dir}.js` )
			{
				bot.commands.set( dir, pull );
			}
			else if ( file === `${dir}DB.js`)
			{
				DBs[dir] = pull;
			}
		}
		table.addRow( dir, 'Ready' );
		index++;
	} );
	console.log( table.toString() );
	console.log('Logging into Bot User...');
}

function initDBs()
{
	/** {number} */
	let k = 0;
	for ( k = 0; k < commands.length; k++ )
	{
		if ( DBs[commands[k]] )
		{
			DBs[commands[k]].init();
		}
	}
}

process.on( 'uncaughtException', function( err ) {
	console.log('Caught exception: ' + err) ;
	throw err;
});