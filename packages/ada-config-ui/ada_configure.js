Template.configureLoginServiceDialogForAda.helpers({
  siteUrl: function () {
    //return Meteor.absoluteUrl();
   return 'https://'+window.location.hostname+':'+window.location.port;
  }
});

Template.configureLoginServiceDialogForAda.fields = function () {
  return [
    {property: 'appId', label: 'App ID'},
    {property: 'secret', label: 'App Secret'}
  ];
};
