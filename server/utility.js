
import { Email } from 'meteor/email';
import { Accounts } from 'meteor/accounts-base';

export class Utility {

    constructor() {};

    generateToken() {
        return Accounts._generateStampedLoginToken();
    };

    sendEmail(to, from, subject, text, attachment) {
        //check([to, from, subject, text], [String]);

        Meteor.unblock();

        Email.send({ to, from, subject, text });
    };
};
