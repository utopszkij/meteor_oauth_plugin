Package.describe({
  summary: "Login service for Ada accounts",
  version: "1.0.1-beta1"
});

Package.onUse(function(api) {
  api.use('accounts-base', ['client', 'server']);
  // Export Accounts (etc) to packages using this one.
  api.imply('accounts-base', ['client', 'server']);
  api.use('accounts-oauth', ['client', 'server']);
  api.use('ada-oauth', ['client', 'server']);

  api.addFiles('ada_login_button.css', 'client');

  api.addFiles("ada.js");
});
