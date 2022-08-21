import { google } from 'googleapis';
import "https://apis.google.com/js/api.js";

const youtube = async (_, res) => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY
    },
    scopes: ['https://www.googleapis.com/auth/youtube.readonly']
  });

  const youtube = google.youtube({
    auth,
    version: 'v3'
  });

  authenticate();
  const data = execute();

  const response = await youtube.channels.list({id: ['UCGuJC8U8zMOpvKdYPsh1M2Q']},{})

  const channel = response.data.items[0] || data.items;
  const { subscriberCount, viewCount } = channel.statistics;

  return res.status(200).json({
    subscriberCount,
    viewCount
  });
};

function authenticate() {
    return google.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"})
        .then(function() { console.log("Sign-in successful"); },
              function(err) { console.error("Error signing in", err); });
  }
  function loadClient() {
    google.client.setApiKey(process.env.GOOGLE_PRIVATE_KEY);
    return google.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }
  // Make sure the client is loaded and sign-in is complete before calling this method.
  function execute() {
    return google.client.youtube.channels.list({
      "part": [
        "snippet,contentDetails,statistics"
      ],
      "id": [
        "UCGuJC8U8zMOpvKdYPsh1M2Q"
      ]
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  }

export default youtube;