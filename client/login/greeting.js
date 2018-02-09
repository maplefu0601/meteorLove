


Template.greeting.events({

    'submit #greeting-form': function(event, temp) {

        event.preventDefault();

        var value = temp.find('#greeting-text').value;

        Meteor.call('setGreeting', value);
    }
});