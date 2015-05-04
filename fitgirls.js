			Products = new Mongo.Collection("products");

			var productImagesStore = new FS.Store.FileSystem('productImages', {
				path: '~/uploads/full'
			});

			productImages = new FS.Collection('productImages', {
				stores: [productImagesStore]
			});
			productImages.allow({
				insert: function () {
					return true;
				},
				update: function () {
					return true;
				},
				remove: function () {
					return true;
				},
				download: function () {
					return true;
				}
			});


		if (Meteor.isClient) {
			  // This code only runs on the client
			Template.home.helpers({
			  	products: function () {
			  		return Products.find({});
			  	},
			  	image:function(){ 
					return console.log(productImages.findOne({'metadata.productId':this._id})); 
					//return productImages.findOne({'metadata.productId':this._id})
			  	}
			});


			  Template.add.helpers({
			  	categories: function(){
			  		return categories.find({});
			  	}
			  });

			  
			Template.add.events({
			  	"submit form": function(event, template) {
			  		event.preventDefault();
			  		
			  		var file = $('#file').get(0).files[0],
			  		fsFile = new FS.File(file),
			  		productData = {
			  			title:$('#title').val(),
			  			price:$('#price').val(),
			  			category:$('#category').val()
			  		}

			  		Products.insert(productData,function(err,result){
			  			if(!err){
			  				fsFile.metadata = {
	                        	productId:result, //we use metadata to refer the recent object id with the product images
	                    	}
	                    	productImages.insert(fsFile,function(err,result){
	                    		if(!err){
	                    			console.log("New images inserted")
	                    		}
	                    	});
	                	}
	            	});
			  	}
			});
		}





