var Encryptr = (function (window, console, undefined) {
  "use strict";
  console       = console || {};
  console.log   = console.log || function() {};
  var Backbone  = window.Backbone,
      _         = window._,
      $         = window.Zepto;

  var Encryptr = function () {
    this.online = true; // assume a hopeful default
  };

  Encryptr.prototype.init = function() {
    window.document.addEventListener("deviceready", this.onDeviceReady, false);
    window.document.addEventListener("resume", this.onResume, false);
    window.document.addEventListener("pause", this.onPause, false);
    window.document.addEventListener("offline", this.setOffline, false);
    window.document.addEventListener("online", this.setOnline, false);
    // Backstack effects
    this.noEffect = new window.BackStack.NoEffect();
    this.fadeEffect = new window.BackStack.FadeEffect();
    this.defaultEffect = new this.FastSlideEffect();
    this.defaultPopEffect = new this.FastSlideEffect({
      direction: "right"
    });
    // Set the hostname for the Crypton server
    window.crypton.host = "192.168.1.12";
    // Render the login view (and bind its events)
    this.loginView = new this.LoginView().render();
    // Hax for Android 2.x not groking :active
    $(document).on("touchstart", "a", function(event) {
      var $this = $(this);
      $this.addClass("active");
    });
    $(document).on("touchend", "a", function(event) {
      var $this = $(this);
      $this.removeClass("active");
    });
    $(document).on("touchmove", "a", function(event) {
      var $this = $(this);
      $this.removeClass("active");
    });
  };

  Encryptr.prototype.onDeviceReady = function(event) {
    if (window.device && window.device.platform === "iOS" && parseFloat(window.device.version) >= 7.0) {
      window.document.querySelectorAll(".app")[0].style.top = "20px"; // status bar hax
    }
  };

  Encryptr.prototype.setOffline = function(event) {
    this.online = false;
  };

  Encryptr.prototype.setOnline = function(event) {
    this.online = true;
  };

  Encryptr.prototype.onResume = function(event) {
    // Throw up the login screen
    window.app.loginView.show();
    window.setTimeout(function() {
      window.app.session = undefined;
      window.app.navigator.popAll(window.app.noEffect);
      window.app.mainView.menuView.close();
    },100);
  };

  Encryptr.prototype.onPause = function(event) {
    // ...
  };

  Encryptr.prototype.onBackButton = function(event) {
    navigator.app.exitApp();
  };

  Encryptr.prototype.onMenuButton = function(event) {
    // ...
  };

  return Encryptr;

})(this, this.console);
