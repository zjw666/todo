const template = require("./template.ejs");
require("./index.less");

module.exports = function(){
	return {
		tpl: template
	};
};