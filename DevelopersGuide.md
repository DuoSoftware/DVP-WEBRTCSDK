# WEBRTC SDK Develpoment Guide

### Login

##### Method : 
###### ConfigAgent(username,password,domain, onConnected, onDisconnected, onIncomingCall, callback)

This will connect user to the server, by default user is registered on connection establishment.

    * username : User
    * password : Password of user
    * domain :  WebServer IP+port ex:- 45.55.163.131:5066
    * onConnected : Fires on Connection stablishment events 
    * onDisconnected : Fires on Disconnection events 
    * onDisconnected : Fires on Incomming call events 
    * callback : contains two params (error,response) ex:- callback(error,response)
##### ** onConnected,onDisconnected,onDisconnected functions should declares on UI script and these names should be as above.

### Registration

##### Method : 
###### RegisterUser(callback)

User registration handles here, Although on connection establishment user is registerd, this methoud can be used to handle registration when it needs.

    * callback : contains two params (error,response) ex:- callback(error,response)

### Make a call

##### Method : 
###### CallUser(uri,videoSt,RemoteVidID,LocalVidID,callback)

This will connect user to the server, by default user is registered on connection establishment.

    * uri : callee's username 
    * videoSt : Video status (true/false)
    * RemoteVidID :  Callee's video displaying element's ID
    * LocalVidID : caller's video displaying element's ID
    * callback : contains two params (error,sessionID) ex:- callback(error,generated session's ID)
    
##### ** callback returns error and new session's ID generated for the call


### Answer a call

##### Method : 
###### AnswerCall(SessionID,VideoSt,RemoteVidID,LocalVidID)

In a scenario of Incomming call , have to pass above params to answer it.

    - SessionID : ID of genarated session for the new incomming  call 
    * videoSt : Video status (true/false)
    * RemoteVidID :  Callee's video displaying element's ID
    * LocalVidID : caller's video displaying element's ID
    
    
##### ** Returns true on success false on fail
##### ** In scenario of inncomming call, onIncomingCall event mentioned above will recieve the sessionID


### Disconnect a call

##### Method : 
###### DisconnectCall(sessionID)

Uses when user want to disconnect a call

    * SessionID : ID of genarated session for ongoing or incomming call 
    

### Remove a session 

##### Method : 
###### SessionRemover(sessionID)

User when developer wants to remove a session.

    * sessionID : ID of session wants to remove 


