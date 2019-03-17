const template = require('./template.ejs');
require('./index.less');

const datePicker = function(){
	return {
		tpl: template
	}
};

module.exports = datePicker;