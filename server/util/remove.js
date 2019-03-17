const remove = function(data){
	return function(err, client){
		if (err) throw err;

		const db = client.db('todo');

		db.collection("todo").updateOne({user:data.user}, {$pull:{events:{event:data.event, time:data.time}}}, function(err,res){
			if (err) throw err;
			console.log("文档删除成功");
		})
		client.close();
	};
}

module.exports = remove;