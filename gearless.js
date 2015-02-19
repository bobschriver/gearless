if(Meteor.isClient) {
    Template.gear_list.helpers({

        gear_list : function (user_id) {
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
        gear_property : function (gear_item_id) {
                            return GearItems.find({ _id : gear_item_id }).properties;
                        },

    });

    Template.suggested_gear_property.rendered = function() { 
        //Only call inject for the currently rendered template's typehead input
        //Things go weird if you call inject for inputs that are not rendered yet
        Meteor.typeahead.inject(this.find('.typeahead'));
    };

    Template.suggested_gear_property.helpers({
        suggested_gear_properties : function () {
                                        return SuggestedGearProperties.find().fetch().map(function(gear_property) { return {value: gear_property.gear_property_heading} });
                                    },
    });

    Template.wanted_gear.helpers({
        get_wanted_gear : function (user_id) {
                              var primary_gear_list = GearLists.find({ user_id : user_id }).fetchOne();

                              //var gear_items = GearItems.find({ $and : [ { gear_list_id : primary_gear_list._id } , { wanted.value : true } ] });            
                              var wanted_gear = gear_items.map( get_matching_gear_items(gear_item) );
                          },

        get_matching_gear_items : function(gear_item) {

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

    Template.gear_property.events({
        'submit .gear_property' : function (event) {
            return false;

        },

    });

    Template.suggested_gear_property.events({
        'submit .suggested_gear_property' : function (event) {
            var gear_property_value = event.target.gear_property_text.value;

            console.log('submitting suggested gear property');

            var set_object = {}
            set_object['properties'][this.gear_property_heading] = gear_property_value;

            GearItem.update(
                { _id : this.gear_item_id } ,
                { $set : set_object }); 

            return false; 
        }
    });

    /*Meteor.startup(function(){
        // initializes all typeahead instances
        console.log("initializing meteor typeagead");
        Meteor.typeahead.inject();
    });*/

    Session.set('user_id' , 0);
}


var GearLists = new Mongo.Collection("gear_lists");
var GearItems = new Mongo.Collection("gear_items");
var GearUses = new Mongo.Collection("gear_uses");
var GearProperties = new Mongo.Collection("gear_properties");
var SuggestedGearProperties = new Mongo.Collection("suggested_gear_properties");

SuggestedGearProperties.remove({});

SuggestedGearProperties.insert({  
    gear_property_heading : 'Manufacturer' 
});
SuggestedGearProperties.insert({
    gear_property_heading : 'Weight'
});
SuggestedGearProperties.insert({
    gear_property_heading : 'Hydrostatic Head'
});
SuggestedGearProperties.insert({
    gear_property_heading : 'Area'
});
SuggestedGearProperties.insert({
    gear_property_heading : 'Hydrostatic Head'
});
SuggestedGearProperties.insert({
    gear_property_heading : 'Loft'
});

