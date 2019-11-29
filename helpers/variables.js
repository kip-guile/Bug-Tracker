module.exports = {
    errorMessage: 'Give us a second. We can get this fixed',
    regWelcome: function (firstName) {
       return `FitFam! Welcome Aboard, ${firstName}!!`
    },
    loginWelcome: function (firstName) {
       return `Welcome ${firstName}!`
    },
    profileUpdated: 'User data successfully updated',
    profileDeleted: 'User data successfully deleted',
    alreadyInUse: 'Email already in use',
    invalid: 'Oops! Invalid Credentials',
    missingFields: 'You are missing some required fields!',
    noBodyData: 'Please supply data in the request body!',
    tokenInvalid: 'Token validation failed!',
    supplyToken: 'Please supply token!',
    invalidEmail: 'Not a valid email address format',
    noAccess: 'You are not authorised to access or modify this information',
    newEntry: 'successfully created!',
    updatedEntry: 'successfully updated!',
    entryRemoved: function (value) {
       return `${value} has been successfully deleted`
    },
    limitReached: 'Maximum class size reached',
    // eslint-disable-next-line no-useless-escape
    mailRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
 }