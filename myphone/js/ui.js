

var SID =      document.getElementById('txt_001');

var Test=
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
		document.getElementById("txt_001").value=res;
	},


	CreateUA:function ()
	{

		ConfigAgent('user1','12345','104.131.105.163',Test.OnConnected,Test.OnDisconnected,Test.OnIncomingCall,function(e,r)
		{
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


	CallUsers:function ()
	{
		CallUser('user2',function(e,r)
		{

			alert(e);
			alert(r);

			document.getElementById("txt_001").value = r;


		});

	},

	EndCalls:function()
	{

		DisconnectCall(document.getElementById("txt_001").value,function(err,res)
		{
			alert(res);


		});

	},
	AnswerCall:function()
	{
		var res=AnswerCall(document.getElementById("txt_001").value);

		alert(res);
	}


}