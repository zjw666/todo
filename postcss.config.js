module.exports = {
	plugins: [
		require('autoprefixer')({
			'browsers':[
				'last 5 versions',
				'> 0.5%',
				'not dead'
			]
		})
	]
}