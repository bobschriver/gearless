Template.gear_item.helpers({ 
    gear_item : function (gear_list_id) {
                    return GearItems.find({ gear_list_id : gear_list_id });
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

