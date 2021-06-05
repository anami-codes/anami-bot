//Modules
const Sequelize = require( 'sequelize' );

// Enums
const globalAchive = require( __dirname + '/../../core/globalArchive.js' );
const Actions = globalAchive.DBActions;
const DBConfig = globalAchive.DBConfig;

/**
 * @returns {void}
 */
function init()
{
	ChannelDB.sync();
}

/**
 * @param {string} entryId
 * @param {string} action
 * @param {any[]} values
 */
async function modify( dbName, action, values )
{
	switch ( action )
	{
	case Actions.ADD:
		add( values );
		break;
	}
}

module.exports = { init, modify };

async function add( values )
{
	const entry = await ChannelDB.create({
		id: values[0],
		serverId: values[1],
		channelId: values[2],
		channelName: values[3],
	});
	toConsole( entry );
}

function toConsole( entry ) {
	console.log( `Entry ID: ${entry.id}` );
	console.log( `Server ID: ${entry.serverId}` );
	console.log( `Channel ID: ${entry.channelId}` );
	console.log( `Channel Name: ${entry.channelName}` );
}

// DB
const ChannelDB = DBConfig.define( 'channelList', {
	id: {
		type: Sequelize.INTEGER,
		unique: true,
		primaryKey: true,
		autoIncrement: true,
	},
	serverId: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	channelId: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	channelName: {
		type: Sequelize.STRING,
		allowNull: false,
	},
});

