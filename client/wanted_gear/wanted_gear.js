Template.wanted_gear.helpers({
    get_wanted_gear : function (user_id) {
                          var primary_gear_list = GearLists.find({ user_id : user_id }).fetchOne();

                          //var gear_items = GearItems.find({ $and : [ { gear_list_id : primary_gear_list._id } , { wanted.value : true } ] });            
                          var wanted_gear = gear_items.map( get_matching_gear_items(gear_item) );
                      },

get_matching_gear_items : function(gear_item) {

                          },
});


