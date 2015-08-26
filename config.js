
	function phone_init(ws_server,uri,pwd)
	{

	configuration  = {
			'ws_servers': ws_server,
	  'uri': uri,
	  'password': pwd
		  };
		  
		  var ua = new JsSIP.UA(configuration);
		  return ua;
		  

	}