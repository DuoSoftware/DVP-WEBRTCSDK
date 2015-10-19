# DVP-WEBRTCSDK
webrtc sdk

WEBRTC SDK Documentation
How to

•	Make a Connection

ConfigAgent(username,password,domain, onConnected, onDisconnected, onIncomingCall, callback)
 	Parameters:
o	onConnected = method with two parameters (error,sessionID) , Should be declared on client’s end. Triggered on new  call establishment.
 
o	onDisconnected = method with two parameters (error,sessionID) , Should be declared on client’s end. Triggered on call disconnection.


o	onIncomingCall = method with two parameters (error,sessionID) , Should be declared on client’s end. Triggered on incoming call from user.

o	Callback = returns two parameters (error,ConnectionStatus) upon successful connection establishment.

* By default user is registered on connection establishment. 

•	User Registration

RegisterUser(callback)
	Parameters:
o	Callback = returns two parameters (error,CurrentRegistrationStatus) upon successful registration command received .






•	Make a call

       CallUser(uri, VidSt,callback)

        Parameters:
o	uri = Callee’s username
o	Callback = returns two parameters (error,SessionID) upon successful Call made .
o	VidSt = video status (boolean)

              * Have to have two video elements which are named 
			‘remoteVideo’ -  to access other party’s media
			‘localVideo’ -  to access local media


•	Disconnect a call

DisconnectCall(sessionID)

      Parameters:
o	sessionID = Session ID of the call which need to disconnect .

•	Answer Incoming call
     
AnswerCall(SessionID,VidSt)

Parameters:
o	sessionID = Session ID of the call which need to answer .
o	VidSt = video status (boolean)


*  onIncomingCall event received sessionID of Incoming call session.





