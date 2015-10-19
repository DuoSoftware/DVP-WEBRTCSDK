
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
		document.getElementById("txt_calluser").value=res;
	},


	CreateUA: function () {
        
        ConfigAgent(document.getElementById('txt_usr').value, document.getElementById('txt_pwd').value, document.getElementById('txt_ws').value, Test.OnConnected, Test.OnDisconnected, Test.OnIncomingCall, function (e, r) {
            alert("error "+e);
            alert("response "+r);

        });
    },

	RegUA:function ()
	{

		RegisterUser(function(e,r)
		{
			alert("error "+e);
            alert("response "+r);
		});


	},


	CallUsers:function (VidSt)
	{
		CallUser(document.getElementById('txt_calluser').value,VidSt,function(e,r)
		{

			alert("error "+e);
            alert("response "+r);

			document.getElementById('txt_calluser').value = r;


		});

	},

	EndCalls:function()
	{

		DisconnectCall(document.getElementById('txt_calluser').value,function(err,res)
		{
			alert("CallEnding "+res);


		});

	},
	AnswerCall:function(VidSt)
	{
		var res=AnswerCall(document.getElementById('txt_calluser').value,VidSt,'remoteVideo','localVideo');

		alert("Call Answering "+res);
	}


}