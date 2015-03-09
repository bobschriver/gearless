Template.gear_list.helpers({

    gear_list : function (user_id) {
                    return GearLists.find({ user_id : user_id });
                },

    get_user_id : function() {   
                  var user_id = { user_id : Session.get('user_id') };
                  console.log(user_id);
                  return user_id;
              },

});

Template.gear_list.events({	
    'submit .gear_list': function (event) {
        var user_id = this.user_id;
        var gear_list_text = event.target.gear_list_text.value;

        GearLists.insert({ 
            user_id: user_id,
            gear_list_text: gear_list_text
        });

        event.target.gear_list_text.value = "";
        return false;
    },

});

