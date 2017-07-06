
module.exports=function(app,knex){


	app.get('/getdata',function(req,res){
		//GET DATA
		//normal select query
/*		knex('userinfo').distinct('name', 'phone').where({name:'amit',phone:'11111'})
		.then(function(data){
			res.status(250)
			.json({data})
		})*/

		//Right Join
		knex('*').distinct().from('userinfo').rightJoin("placeinfo",function(){
			this.on('placeinfo.userid', '=', 'userinfo.id')
		}).then(function(data){
			res.status(250)
			.json({data})
		})

	})
	

	app.post('/insert',function(req,res){
		//insert query
		//console.log(req.body.name);		

			var userdata={
				name:req.body.name,
				phone:req.body.phone,
				email:req.body.email
			}

			var placeinfo={
				city:req.body.city,
				qualification:req.body.qual,
				userid:''
			}
			

			knex("userinfo").insert(userdata)
			.then(function(id){

				placeinfo.userid=id;
				knex("placeinfo").insert(placeinfo)
				.then(function(){
					res.status(250)
					.json({responce:true})
				})

			});

		})

	app.post('/update',function(req,res){

		knex('userinfo')
		.where({name:"req.body.name",email:"req.body.email",phone:"req.body.phone"})
		.update({name:"Shakya",email:"hello@email.com",phone:"123456789"})
		.then(function(id){
			res.status(250)	
			.json({id})
		})
	})

	app.get('/remove',function(req,res){

		knex('userinfo')
		.where({name:'helloAA'})
		.del()
		.then(function(id){
			res.status(250)
			.json({res:id})
		})

		console.log("remove")
	})
}