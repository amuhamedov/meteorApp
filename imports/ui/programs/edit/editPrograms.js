import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './editPrograms.html';
import {Buildings} from '../../../api/Buildings.js';

Template.editProgram.onCreated(function programsOnCreated() {
    Meteor.subscribe("buildings");
});

Template.editProgram.onRendered(function(){
    var item = Buildings.findOne({'_id':FlowRouter.getParam("itemId") });
    $('#year').val(item.year);
});


Template.editProgram.events({
  'submit': function(e,t) {
    e.preventDefault();
    var building = {};
    building.name = t.find('#inputName').value;
    building.builder = t.find('#inputBuilder').value;
    building.year = t.find('#year').value;
    building._id = FlowRouter.getParam("itemId");

    Meteor.call('updateBuilding', building, function(err){
      if (err) {
        console.log(err.reason);

      } else {
        Bert.alert({
          title: 'Редактирование',
          message: 'Сохранено успешно',
          type: 'info',
          style: 'growl-top-right',
          icon: 'fa-floppy-o '
        });
        FlowRouter.go('/programs');
      }
    });
  },
  "reset": function(e, t){
     e.preventDefault();
     FlowRouter.go('/programs');
  },
});


Template.editProgram.helpers({
  item: function(){
    var item = Buildings.findOne({'_id':FlowRouter.getParam("itemId") });

    return item;
  },
});
