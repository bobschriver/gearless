if(Meteor.isClient) {
	Template.add_gear.helpers({
		gear_properties : function(gear_use) {
			
			//TODO Fetch default gear properties from DB
			gear_properties = [{
					gear_property_name: 'Manufacturer',
					gear_property_example: 'Twist It!'
				},
				{
					gear_property_name: 'Weight',
					gear_property_example: 'Bop it!'
				}];

			// TODO Fetch gear properties based off gear use
			if ( gear_use == 'Tarp' ) {
				gear_properties.push({
					gear_property_name: 'Area',
					gear_property_acceptable_units : ['square feet', 'square meters']
				});

				gear_properties.push({
					gear_property_name: 'Hydrostatic Head',
				});
			}
			else if ( gear_use == 'Sleeping Bag' ) {
				gear_properties.push({
					gear_property_name: 'Loft',
					gear_property_acceptable_units : ['inches', 'centimeters']
				});

			}
			else if ( gear_use == 'Raingear' ) {
				gear_properties.push({
					gear_property_name: 'Hydrostatic Head',
				});

			}

			return gear_properties;
		},

		gear_use : function (gear_item_id) {
			return GearUses.find({ _id : gear_item_id });
		},

		gear_item : function () {
			return GearItems.find({});
		}
	});
	
	Template.add_gear.events({
		'submit .gear_item': function (event) {
			var gear_item = event.target.gear_item.value;
			var gear_item_id = event.target.gear_item._id;
			console.log(gear_item);
			console.log(gear_item_id);
		
			GearItems.insert({ gear_item_text: gear_item });
							
			return false;
		},
		
		'submit .gear_use': function (event) {
			var gear_item = event.target.gear_use.value;
			console.log(gear_item);
			
			GearUses.insert({ gear_use_text: gear_use });

			return false;
		}
	});
}

var GearItems = new Mongo.Collection("gear_items");
var GearUses = new Mongo.Collection("gear_uses");


