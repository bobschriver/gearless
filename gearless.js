if(Meteor.isClient) {
	Template.gear_list.helpers({
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
			return GearUses.find({ gear_item_id : gear_item_id });
		},

		gear_item : function (gear_list_id) {
			return GearItems.find({ gear_list_id : gear_list_id });
		},

        gear_list : function (user_id) {
            console.log("Fetching gear lists");
            console.log(user_id);
			return GearLists.find({ user_id : user_id });
		},

        get_user_id : function () {
            var user_id = { user_id : Session.get('user_id') };
            return user_id;
        }
	});
	
	Template.gear_list.events({
		'submit .gear_item': function (event) {
			var gear_item = event.target.gear_item.value;
			var gear_item_id = event.target.gear_item._id;
		    
            // TODO: populate data context with gear list ID
            var gear_list_id = this.gear_list_id;

            console.log("Inserting gear items");
            console.log(user_id);

			GearItems.insert({ gear_item_text: gear_item });
							
			return false;
		},
		
		'submit .gear_use': function (event) {
			var gear_use = event.target.gear_use.value;
			
			GearUses.insert({ gear_use_text: gear_use });

			return false;
        },

        'submit .gear_list': function (event) {
			var user_id = this.user_id;
            
            console.log("Inserting gear lists");
            console.log(user_id);

            GearLists.insert({ user_id: user_id });

			return false;
        },

	});

        
    Session.set('user_id' , 0);
}

var GearLists = new Mongo.Collection("gear_lists");
var GearItems = new Mongo.Collection("gear_items");
var GearUses = new Mongo.Collection("gear_uses");


