import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './createPrograms.html';
import {Buildings} from '../../../api/Buildings.js';



Template.createProgram.events({
  'submit': function(e,t) {
        e.preventDefault();
        var building = {};
        building.name = t.find('#inputName').value;
        building.builder = t.find('#inputBuilder').value;
        building.year = t.find('#year').value;

        Meteor.call('addBuilding', building, function(err){
          if (err) {
            console.log(err.reason);

          } else {
            Bert.alert({
              title: 'Уведомление',
              message: 'Запись добавлена успешно',
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
