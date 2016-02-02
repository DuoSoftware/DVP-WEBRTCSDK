
var Test =
{


    
	OnConnected:function(err,res)
	{
		//alert("Call connected event.....");
		document.getElementById("txtCallStatus").innerHTML ="Call Stablished";
		
		
	},
	OnDisconnected:function (err,res)
	{
		//alert("Call disconnected ......");
		document.getElementById("txtCallStatus").innerHTML ="Call Disconnected and Ready to Call";
		console.log("Call Disconnected");
		console.log("Disconnected Response : "+res.Res);
		console.log("Disconnected ResponseCode : "+res.ResCode);
		console.log("Disconnected Action : "+res.Action);
		console.log("Disconnected SessionID : "+res.SID);
		//console.log("Disconnection reason "+res.response);
		//console.log("Disconnected data "+res.Action);
		//console.log("Disconnected reason code "+res.ResCode);
		
	},
	OnIncomingCall:function (err,res)
	{
		//alert("Incomming call......");
		document.getElementById("txtCallStatus").innerHTML ="Incoming Call form "+res.user;
	//AnswerCall(res);
		document.getElementById("txt_calluser").value=res.id;
		//alert("Caller "+res.user);
		//console.log("Incoming call ",res.user)
	},


	CreateUA: function () {
        //alert("123");
        ConfigAgent(document.getElementById('txt_usr').value, document.getElementById('txt_pwd').value, document.getElementById('txt_ws').value,document.getElementById('slct_ws').value, Test.OnConnected, Test.OnDisconnected, Test.OnIncomingCall, function (e, r) {
            //alert(e);
            //alert(r);
			if(e==null)
			{
			document.getElementById("txtConnection").innerHTML ="Connected";
			document.getElementById("txtReg").innerHTML =r;
				if(r=="registered")
				{
					document.getElementById("login_reg").value="Unregister";
			
				}
				else
				{
					document.getElementById("login_reg").value="Register";
				}
			}
			else
			{
				document.getElementById("txtConnection").innerHTML ="Connection error/ Registration failed";
			}
			

        });
    },

	RegUA:function ()
	{

		RegisterUser(function(e,r)
		{
		
		document.getElementById("txtReg").innerHTML =r;
			//alert(e);
			//alert(r);
		});


	},


	CallUsers:function (VidSt)
	{
		CallUser(document.getElementById('txt_calluser').value,VidSt,'remoteVideo','localVideo',function(e,r)
		{

			//alert(e);
			//alert(r);
			var x=document.getElementById('txt_calluser').value;
			document.getElementById('txt_calluser').value = r;

			document.getElementById('txtCallStatus').innerHTML = "Calling "+x;


		});

	},

	EndCalls:function()
	{

		DisconnectCall(document.getElementById('txt_calluser').value,function(err,res)
		{
			document.getElementById("txtCallStatus").innerHTML ="Call Ended and Ready to Call";


		});

	},
	AnswerCall:function(VidSt)
	{
		var res=AnswerCall(document.getElementById('txt_calluser').value,VidSt,'remoteVideo','localVideo');

		//alert(res);
		document.getElementById("txtCallStatus").innerHTML ="Answered";
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