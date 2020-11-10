var forever = require('forever-monitor');

var child = new (forever.Monitor)('./server/app.js', {
	max: 5,
	silent: false,
	args: []
});

child.on('exit', function() {
	console.log('SERVER DOWN');
});

child.start();