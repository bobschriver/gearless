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

            GearUses.insert({ gear_use_text: gear_use });

            return false;
        }
    });

    Session.set('user_id' , 0);
}

var GearLists = new Mongo.Collection("gear_lists");
var GearItems = new Mongo.Collection("gear_items");
var GearUses = new Mongo.Collection("gear_uses");


