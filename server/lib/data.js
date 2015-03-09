function init_suggested_gear_properties () {
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
        gear_property_heading : 'Loft'
    });
}

Meteor.startup( function () {
    init_suggested_gear_properties();
});
