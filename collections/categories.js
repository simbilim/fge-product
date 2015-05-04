categories = new Mongo.Collection("categories");

if (categories.find().count() === 0) { 
	categories.insert({
		title: 'shoes',
		url: '/shoes'
	});
}

