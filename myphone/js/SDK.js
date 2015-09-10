
var UserAgnt={};
var userAgent;

var Sessions={};

function ConfigAgent(username,password,domain, onConnected, onDisconnected, onIncomingCall, callback)
{

var uri=username.concat("@",domain);
var ws="ws://"+domain+":5066";

	  userAgent = new SIP.UA({
	  uri: uri,
	  wsServers: [ws],
	  authorizationUser: username,
	  password: password
	});

	UserAgnt.OnConnected = onConnected;
	UserAgnt.OnDisconnected = onDisconnected;
	UserAgnt.OnIncomingCall = onIncomingCall;

	userAgent.on('connected', function () {
		
		callback(null,'Connected');
	  });
  
	userAgent.on('invite', function (session) {
		
		
		Sessions[session.id] = session;
		UserAgnt.OnIncomingCall(null,session.id);
		EventListner(session);

		
	  });

}

function RegisterUser(callback)
{
   if(userAgent.isRegistered())
    {
		userAgent.unregister();

    }
   else
   {
		userAgent.register();
   }
   
   userAgent.on('registered', function () {
		callback(null,'registered');
  });

  userAgent.on('unregistered', function () {
		callback(null,'unregistered');
  });
}

function AnswerCall(SessionID)
{

 var session = Sessions[SessionID];
 
	 if(session)
	 {
		session.accept({
		media: {
		  constraints: {
			audio: true,
			video: false
		  },
			  render: {
				remote: document.getElementById('remoteVideo'),
				local: document.getElementById('localVideo')
				}
		}
	  });
	  
	  return true;
	 }
	 else
	 {
	 return false;
	 
	 }

 /*
var session = userAgent.invite(uri, {
    media: {
      constraints: {
        audio: true,
        video: false
      }
    }
  }); 
  
  session.on('accepted', function (session) {
    
	if(UserAgnt[session.uuid])
	{
		session.mediaHandler.render();
		UserAgnt.OnConnected(session.uuid);
	}
	
  });
  */

}

function CallUser(uri,callback)
{

		var options = {
		media: {
		  constraints: {
			audio: true,
			video: false
			},
		  render: {
            remote: document.getElementById('remoteVideo'),
            local: document.getElementById('localVideo')
			}
		}
		}

	var session = userAgent.invite(uri, options); 
	  
	Sessions[session.id] = session;
	EventListner(session);
	callback(null,session.id);
  

}


function DisconnectCall(sessionID)
{

	var session=Sessions[sessionID];
	session.bye();
	


}
	
function EventListner(session)
{
	session.on('failed',function()
	{
		SessionRemover(session);
		UserAgnt.OnDisconnected(null,session.id);
	
	});
	session.on('bye',function()
	{
		SessionRemover(session);
		UserAgnt.OnDisconnected(null,session.id);
	
	});
	
	session.on('accepted',function()
	{
		UserAgnt.OnConnected(null,session.id);
	
	});
	
	
	
}
function SessionRemover(session)
{
	if(Sessions[session.id])
	{
		delete Sessions[session.id];
	}
	else
	{
		return;
	}

}

function ClickToCall(extension,company,tenant,callback)
{

CallUser(extension,function(err,res)
{

callback(err,res);

});


}











