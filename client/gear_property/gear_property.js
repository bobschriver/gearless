Template.gear_property.helpers({
    gear_property : function (gear_item_id) {
                        return GearItems.find({ _id : gear_item_id }).properties;
                    },

});

Template.gear_property.events({
    'submit .gear_property' : function (event) {
        return false;

    },

});

