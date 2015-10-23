
var Test =
{


    
	OnConnected:function(err,res)
	{
		alert("Call connected.....");
	},
	OnDisconnected:function (err,res)
	{
		alert("Call disconnected ......");
	},
	OnIncomingCall:function (err,res)
	{
		alert("Incomming call......");
	//AnswerCall(res);
		document.getElementById("txt_calluser").value=res.id;
		alert("Caller "+res.user);
	},


	CreateUA: function () {
        alert("123");
        ConfigAgent(document.getElementById('txt_usr').value, document.getElementById('txt_pwd').value, document.getElementById('txt_ws').value, Test.OnConnected, Test.OnDisconnected, Test.OnIncomingCall, function (e, r) {
            alert(e);
            alert(r);

        });
    },

	RegUA:function ()
	{

		RegisterUser(function(e,r)
		{
			alert(e);
			alert(r);
		});


	},


	CallUsers:function (VidSt)
	{
		CallUser(document.getElementById('txt_calluser').value,VidSt,'remoteVideo','localVideo',function(e,r)
		{

			alert(e);
			alert(r);

			document.getElementById('txt_calluser').value = r;


		});

	},

	EndCalls:function()
	{

		DisconnectCall(document.getElementById('txt_calluser').value,function(err,res)
		{
			alert(res);


		});

	},
	AnswerCall:function(VidSt)
	{
		var res=AnswerCall(document.getElementById('txt_calluser').value,VidSt,'remoteVideo','localVideo');

		alert(res);
	},
	
	HoldCall:function()
	{
	alert("HOLD PRESSED");
	var remote=document.getElementById('remoteVideo');
	var local=document.getElementById('localVideo');
	alert("Remote is "+remote.muted);
	remote.pause();
	local.pause();
	local.muted=true;
	remote.muted=true;
	
	
	},
	UnHoldCall:function()
	{
	alert("HOLD PRESSED");
	var remote=document.getElementById('remoteVideo');
	var local=document.getElementById('localVideo');
	alert("Remote is "+remote.muted);
	remote.play();
	local.play();
	local.muted=false;
	remote.muted=false;
	
	
	}


}