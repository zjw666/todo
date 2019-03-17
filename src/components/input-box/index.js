const template = require('./template.ejs');
require('./index.less');

const inputBox = function(){
	return {
		tpl: template
	}
};

module.exports = inputBox;
