const update = function(data){
	return function(err, client){
		if (err) throw err;

		const db = client.db('todo');

		db.collection("todo").updateOne({user:data.user}, {$push:{events:{event:data.event, time:data.time}}}, {upsert:true}, function(err,res){
			if (err) throw err;
			console.log("文档更新成功");
		})
		client.close();
	};
}

module.exports = update;