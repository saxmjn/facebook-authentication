    //Login Function
    function Login() {
      FB.login(function(response) {
        if(response.status === "connected") {
          getUserInfo();
        }
        else if(response.status === "not_authorized") {
          console.log("Please log into this app");
        }
        else {
          console.log("Please log into facebook");
        }
      }, {scope: 'public_profile,email,user_likes'});
    }

    //Get User Information
    function getUserInfo() {
      FB.api('/me', {"fields":"name,id,email"}, function(response) {
        var name = response.name;
        var userId = "UserId: " + response.id;
        var email = "Email: " + response.email;

        document.getElementById("name").innerHTML = name;
        document.getElementById("user-id").innerHTML = userId;
        document.getElementById("email").innerHTML = email;
      });
    }

    //Get Photo
    function getPhoto() {
      FB.api('/me/picture?type=normal', function(response) {
        var str="<br/><b>Pic</b> : <img src='"+response.data.url+"'/>";
        document.getElementById("image").style.backgroundImage  = "url('" + response.data.url + "')";
    });
    }

    //Logout Function
    function Logout() {
      FB.logout(function(){document.location.reload();});
    }

    //Load the SDK Asynchronously
    (function(d){
      var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement('script'); js.id = id; js.async = true;
      js.src = "//connect.facebook.net/en_US/all.js";
      ref.parentNode.insertBefore(js, ref);
    }(document));

$(document).ready(function() {
  $.ajaxSetup({ cache: true });
  $.getScript('//connect.facebook.net/en_US/sdk.js', function(){
    FB.init({
      appId      : '225629657860365', // Set YOUR APP ID
      channelUrl : 'http://hayageek.com/examples/oauth/facebook/oauth-javascript/channel.html', // Channel File
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true,  // parse XFBML
      version    : 'v2.7' // or v2.1, v2.2, v2.3, ...
    });      
  });
  $(".login").on("click", "#status", function() {
    $.ajax("profile.html", {
      success: function(response) {
        $(".panel").html(response).slideDown();
        getPhoto();
        Login();
      },
      error: function(request, errorType, errorMessage) {
        alert("Error: " + errorType + " with message: " + errorMessage);
      },
      timeout: 3000,
      beforeSend: function() {
        $(".loader").show();
      },
      complete: function() {
        $(".loader").hide();
      }
    });
  });
});