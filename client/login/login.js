
import { Accounts } from 'meteor/accounts-base';

Template.login.events({

    'submit #login-form': function(event, temp) {

        event.preventDefault();
        var email = temp.find('#login-email').value;
        console.log(email);
        var from = 'love@love.com';
        var subject = 'Sign in to LOVE';

        var emailData = {to: email, from: from, subject: subject, text:''};

        var option = {
            username: email,
            password: 'test',
            profile: {
                active: true,
                greeting:''
            }
        };

        Meteor.call('createEmailUser', option, emailData, function(err, result) {
            if(err) {

            } else {

                console.log(result);
                Accounts.logout();
            }
        });


    }
});
