if(Meteor.isClient) {
    Template.gear_list.helpers({

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

    Template.gear_item.helpers({ 
        gear_item : function (gear_list_id) {
                        return GearItems.find({ gear_list_id : gear_list_id });
                    },
    });

    Template.gear_use.helpers({
        gear_use : function (gear_item_id) {
                       return GearUses.find({ gear_item_id : gear_item_id });
                   },

    });

    Template.gear_property.helpers({
        gear_property : function (gear_use_id) {
                            return GearProperties.find({ gear_use_id : gear_use_id });
                        },

    });

    Template.suggested_gear_property.helpers({
        suggested_gear_property : function (gear_use_id) {
                                      var current_gear_properties = GearProperties.find({ gear_use_id : gear_use_id } , { gear_property_heading : 1 }).fetch();
                                      var gear_use = GearUses.findOne({ _id : gear_use_id }).gear_use_text;
                                      //TODO Investigate if we need to specify blank gear use text for default gear properties
                                      console.log('Finding Suggested gear properties');
                                      console.log(gear_use);
                                      var suggested_gear_properties = SuggestedGearProperties.find({ 
                                          $or : [ { gear_use_text : '' } , { gear_use_text : gear_use } ]  
                                      });
                                      console.log(SuggestedGearProperties.find({}).fetch());
                                      //var suggested_gear_properties = SuggestedGearProperties.find({ gear_use_text : { empty : true } });

                                      console.log(suggested_gear_properties.fetch());

                                      return suggested_gear_properties;
                                  },

    });

    Template.gear_list.events({	
        'submit .gear_list': function (event) {
            var user_id = this.user_id;
            var gear_list_text = event.target.gear_list_text.value;

            console.log("Inserting gear lists");
            console.log(user_id);

            GearLists.insert({ 
                user_id: user_id,
                gear_list_text: gear_list_text
            });

            event.target.gear_list_text.value = "";
            return false;
        },

    });

    Template.gear_item.events({
        'submit .gear_item': function (event) {
            var gear_item_text = event.target.gear_item_text.value;

            // TODO: populate data context with gear list ID
            var gear_list_id = this.gear_list_id;

            console.log("Inserting gear items");
            console.log(gear_list_id);

            GearItems.insert({ 
                gear_item_text: gear_item_text,
                gear_list_id: gear_list_id
            });

            event.target.gear_item_text.value = "";
            return false;
        },
    });

    Template.gear_use.events({
        'submit .gear_use': function (event) {
            var gear_use = event.target.gear_use_text.value;

            console.log('Submitting gear use')
        console.log(gear_use)    

        GearUses.insert({ 
            gear_item_id: this.gear_item_id,
            gear_use_text: gear_use 
        });

    return false;
        }
    });

    Template.gear_property.helpers({
        '.submit gear_property' : function (event) {
            return false;

        },

    });

    Template.suggested_gear_property.helpers({
        '.submit suggested_gear_property' : function (event) {
            var gear_property_text = event.target.gear_property_text.value;

            console.log('submitting suggested gear property');
            console.log(gear_property_text);

            GearProperties.insert({ 
                gear_use_id : gear_use_id,
                gear_property_heading : this.gear_property_heading,
                gear_property_text : this.gear_property_text
            });

            return false; 
        },

    });


    Session.set('user_id' , 0);
}


var GearLists = new Mongo.Collection("gear_lists");
var GearItems = new Mongo.Collection("gear_items");
var GearUses = new Mongo.Collection("gear_uses");
var GearProperties = new Mongo.Collection("gear_properties");
var SuggestedGearProperties = new Mongo.Collection("suggested_gear_properties");

SuggestedGearProperties.remove({});

SuggestedGearProperties.insert({  
    gear_use_text : '',
    gear_property_heading : 'Manufacturer' 
});
SuggestedGearProperties.insert({
    gear_use_text : '',        
    gear_property_heading : 'Weight'
});
SuggestedGearProperties.insert({
    gear_use_text : 'Tarp',
    gear_property_heading : 'Hydrostatic Head'
});
SuggestedGearProperties.insert({
    gear_use_text : 'Poncho',
    gear_property_heading : 'Hydrostatic Head'
});
SuggestedGearProperties.insert({
    gear_use_text : 'Sleeping Bag',
    gear_property_heading : 'Loft'
});

