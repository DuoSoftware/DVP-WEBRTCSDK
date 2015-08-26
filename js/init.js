var _Session = null
var peerconnection_config = peerconnection_config || undefined;

$(document).ready(function(){

function phoneInit(ws_servers,uri,password) {
    var configuration;

    // If js/custom.js was found then use its CustomJsSIPSettings object.
    if (window.CustomJsSIPSettings) {
      configuration = CustomJsSIPSettings;
    }

    // Otherwise load data from the forms.
    else {
      
      if (! sip_uri) {
       
        return false;
      }
      else if (! ws_servers) {
      
        return false;
      }

     

      configuration  = {
       
        uri: uri,
        password:  password,
        ws_servers:  ws_servers,
       
      };
    }

    try {
      ua = new JsSIP.UA(configuration);
    } catch(e) {
      console.log(e.toString())
      return;
    }

   // $("#phone > .status .user").text(sip_uri);
    //phone_dialed_number_screen.focus();
    div_webcam.show();

    // Transport connection/disconnection callbacks
    ua.on('connected', function(e) {
      document.title = PageTitle;
      GUI.setStatus("connected");
      // Habilitar el phone.
     // $("#phone .controls .ws-disconnected").hide();

      ws_was_connected = true;
    });

    ua.on('disconnected', function(e) {
      document.title = PageTitle;
      GUI.setStatus("disconnected");
      // Deshabilitar el phone.
      //$("#phone .controls .ws-disconnected").show();
      // Eliminar todas las sessiones existentes.
      $("#sessions > .session").each(function(i, session) {
        GUI.removeSession(session, 500);
      });

      if (! ws_was_connected) {
        //alert("WS connection error:\n\n- WS close code: " + e.data.code + "\n- WS close reason: " + e.data.reason);
	      console.error("WS connection error | WS close code: " + e.code + " | WS close reason: " + e.reason);
        //if (! window.CustomJsSIPSettings) { window.location.reload(false); }
      }
    });


    // NOTE: Para hacer unregister_all (esquina arriba-dcha un cuadro
    // transparente de 20 x 20 px).

    // NOTE: Para desconectarse/conectarse al WebSocket.
    $("#ws_reconnect").click(function() {
      if (ua.transport.connected)
        ua.transport.disconnect();
      else
        ua.transport.connect();
    });

    phone_call_button.click(function(event) {
      GUI.phoneCallButtonPressed();
    });

    phone_chat_button.click(function(event) {
      GUI.phoneChatButtonPressed();
    });

    phone_dialpad_button.click(function() {
      if ($(this).hasClass("digit-asterisk"))
       // sound_file = "asterisk";
      else if ($(this).hasClass("digit-pound"))
        //sound_file = "pound";
      else
        //sound_file = $(this).text();
      //soundPlayer.setAttribute("src", "sounds/dialpad/" + sound_file + ".ogg");
      //soundPlayer.play();

      //phone_dialed_number_screen.val(phone_dialed_number_screen.val() + $(this).text());
    });

    phone_dialed_number_screen.keypress(function(e) {
       // Enter pressed? so Dial.
      if (e.which == 13)
        GUI.phoneCallButtonPressed();
    });

    // Call/Message reception callbacks
    ua.on('newRTCSession', function(e) {
      // Set a global '_Session' variable with the session for testing.
      _Session = e.session;
      GUI.new_call(e);
    });

    ua.on('newMessage', function(e) {
      GUI.new_message(e)
    });

    // Registration/Deregistration callbacks
    ua.on('registered', function(e){
      console.info('Registered');
      GUI.setStatus("registered");

      if (invitedBy) {
        // This fails in Chrome M38 (it does not propmt for getUseMedia).
        // phone_dialed_number_screen.val(invitedBy);
        // phone_call_button.click();
        // var invited_session = GUI.getSession("sip:" + invitedBy + "@" + tryit_sip_domain);
        // invitedBy = null;

        // $(invited_session).find(".chat > input[type='text']").val("Hi there, you have invited me to call you :)");
        // var e = jQuery.Event("keydown");
        // e.which = 13  // Enter
        // $(invited_session).find(".chat > input[type='text']").trigger(e);
        // $(invited_session).find(".chat > input[type='text']").focus();

        // So let's just chat.
        phone_dialed_number_screen.val(invitedBy);
        phone_chat_button.click();
        var invited_session = GUI.getSession(uri);
        invitedBy = null;
/*
        $(invited_session).find(".chat > input[type='text']").val("Hi there, wanna talk?");
        var e = jQuery.Event("keydown");
        e.which = 13  // Enter
        $(invited_session).find(".chat > input[type='text']").trigger(e);
        $(invited_session).find(".chat > input[type='text']").focus();
		*/
      }
    });

    ua.on('unregistered', function(e){
      console.info('Deregistered');
      GUI.setStatus("connected");
    });

    ua.on('registrationFailed', function(e) {
      console.info('Registration failure');
      GUI.setStatus("connected");

      if (! e.response) {
        // alert("SIP registration error:\n" + e.data.cause);
      }
      else {
        // alert("SIP registration error:\n" + e.data.response.status_code.toString() + " " + e.data.response.reason_phrase)
      }
      // if (! window.CustomJsSIPSettings) { window.location.reload(false); }
    });

    // Start
    ua.start();

 
    // Invitation text and balloon for tryit.jssip.net accounts.

    if (ua.configuration.uri.host === tryit_sip_domain) {
      $("#call-invitation").show();
      $("#call-invitation").click(function() { return false; });

      var invitation_link = invitation_link_pre + ua.configuration.uri.user;

  
    }


   

    

  }




});