

var SID =      document.getElementById('txt_001');
var usr=       document.getElementById('txt_usr').value;
var pwd=       document.getElementById('txt_pwd').value;
var ws=        document.getElementById('txt_ws').value;

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

		ConfigAgent(usr,pwd,ws,Test.OnConnected,Test.OnDisconnected,Test.OnIncomingCall,function(e,r)
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


	CallUsers:function (VidSt)
	{
		CallUser(SID.value,VidSt,function(e,r)
		{

			alert(e);
			alert(r);

			SID.value = r;


		});

	},

	EndCalls:function()
	{

		DisconnectCall(SID.value,function(err,res)
		{
			alert(res);


		});

	},
	AnswerCall:function(VidSt)
	{
		var res=AnswerCall(SID.value,VidSt);

		alert(res);
	}


}