
createSession: function(display_name, uri) {
      console.log('Tryit: createSession');

      var session, compositionIndicator;

      session = MAIN.getSession(uri);

      if (session === null) {
        // iscomposing stuff.
        compositionIndicator = MAIN.createCompositionIndicator(uri);
        compositionIndicator.idle();


        session = {
          uri: uri,
          displayName: display_name,
          call: null,
          compositionIndicator: compositionIndicator,
          isComposing: false,
          chat: []
        };

        MAIN.Sessions.push(session);
      }

      return session;
    }