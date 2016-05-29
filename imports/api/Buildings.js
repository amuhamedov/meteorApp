import { Mongo } from 'meteor/mongo';

export const Buildings = new Mongo.Collection('buildings');

Buildings.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  }
});

Buildings.deny({
  insert: function(){
    return false;
  },
  update: function(){
    return false;
  },
  remove: function(){
    return false;
  }
});

if(Meteor.isServer){

  if(Buildings.find().count() === 0){
      var buildings  = [
        {name:"ЖК Гранд Астана", year:2014, builder:"ТОО ЖилСтройСервис"},
        {name:"ЖК Комфорт таун", year:2015, builder:"ТОО Bi Group"}
      ];

      _.each(buildings, function(item){
        console.log(item);
          Buildings.insert(item);
      });
  }

   console.log("Publishing buildings");
    Meteor.publish("buildings", function(argument){
        return Buildings.find();
    });

    Meteor.methods({
      "addBuilding": function (building) {
        var result = Buildings.insert(building);
        return result;
      },
      "updateBuilding": function (building) {
        var result = Buildings.update({_id:building._id},
          {$set:{'name':building.name,'builder':building.builder, 'year': building.year}}
        );
        return result;
      },
      "removeBuilding": function (buildingId) {
        Buildings.remove(buildingId);
        return buildingId;
      },
    });


}
