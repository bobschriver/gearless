Template.suggested_gear_property.rendered = function() { 
    //Only call inject for the currently rendered template's typehead input
    //Things go weird if you call inject for inputs that are not rendered yet
    Meteor.typeahead.inject(this.find('.typeahead'));
};

Template.suggested_gear_property.helpers({
    suggested_gear_properties : function () {
                                    return SuggestedGearProperties.find().fetch().map(function(gear_property) { 
                                        return {value: gear_property.gear_property_heading} });
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


