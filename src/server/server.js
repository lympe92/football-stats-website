const express = require("express");
const axios = require("axios");
const cors = require("cors"); // Εισαγωγή του middleware cors

const app = express();

// Χρησιμοποιήστε το cors middleware
app.use(cors());

const headers = {
  "x-rapidapi-key": "7a5f0ad935b459e61fc11a77eef52771",
  "x-rapidapi-host": "v3.football.api-sports.io",
};

// Ορίστε ένα route στον server σας που θα λειτουργεί ως proxy
app.get("/api/football/livescores", async (req, res) => {
  let urlParams = "";

  if (req.query.selectedDate != null) {
    urlParams = `date=${req.query.selectedDate}`;
  }
  if (req.query.allScoresMode === "false") {
    urlParams = `ids=${req.query.selectedMatchesIds?.join("-")}`;
  }
  if (req.query.live === "true") {
    urlParams = "live=all";
  }

  try {
    // Κάντε ένα αίτημα προς το εξωτερικό API
    const response = await axios.get(
      `https://v3.football.api-sports.io/fixtures?${urlParams}`,
      { headers }
    );

    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

app.get("/api/football/predictions", async (req, res) => {
  try {
    const response = await axios.get(
      `https://v3.football.api-sports.io/predictions?fixture=${req.query.matchId}`
      ,{ headers } );
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

app.get("/api/football/player", async (req, res) => {
  try {
    const response = await axios.get(
      "http://api.isportsapi.com/sport/football/player?api_key=zLzxLcYyT8IAho7F&teamId=82"
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

app.get("/api/football/match", async (req, res) => {
  try {
    const response = await axios.get(
      `https://v3.football.api-sports.io/fixtures?id=${req.query.matchId}`,
      { headers }
    );

    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

app.get("/api/football/leagues", async (req, res) => {
  const headers = {
    "x-rapidapi-key": "7a5f0ad935b459e61fc11a77eef52771",
    "x-rapidapi-host": "v3.football.api-sports.io",
  };
  try {
    const response = await axios.get(
      "https://v3.football.api-sports.io/leagues",
      { headers }
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.errors.data);
  }
});

app.get("/api/football/leagues/seasons", async (req, res) => {
  const headers = {
    "x-rapidapi-key": "7a5f0ad935b459e61fc11a77eef52771",
    "x-rapidapi-host": "v3.football.api-sports.io",
  };
  try {
    const response = await axios.get(
      "https://v3.football.api-sports.io/leagues/seasons",
      { headers }
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.errors.data);
  }
});

app.get("/api/football/standings", async (req, res) => {
  const headers = {
    "x-rapidapi-key": "7a5f0ad935b459e61fc11a77eef52771",
    "x-rapidapi-host": "v3.football.api-sports.io",
  };
  try {
    const response = await axios.get(
      `https://v3.football.api-sports.io/standings?league=${req.query.leagueId}&season=${req.query.season}`,
      { headers }
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.errors.data);
  }
});

app.get("/api/league/teams", async (req, res) => {
  const headers = {
    "x-rapidapi-key": "7a5f0ad935b459e61fc11a77eef52771",
    "x-rapidapi-host": "v3.football.api-sports.io",
  };
  try {
    const response = await axios.get(
      `https://v3.football.api-sports.io/teams?league=${req.query.leagueId}&season=${req.query.season}`,
      { headers }
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.errors.data);
  }
});

app.get("/api/team/statistics", async (req, res) => {
  const headers = {
    "x-rapidapi-key": "7a5f0ad935b459e61fc11a77eef52771",
    "x-rapidapi-host": "v3.football.api-sports.io",
  };
  try {
    const response = await axios.get(
      `https://v3.football.api-sports.io/teams/statistics?&season=${req.query.season}&team=${req.query.teamId}&league=${req.query.leagueId}`,
      { headers }
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.errors.data);
  }
});

app.get("/api/football/events", async (req, res) => {
  try {
    const response = await axios.get(
      "http://api.isportsapi.com/sport/football/events?api_key=zLzxLcYyT8IAho7F"
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

app.get("/api/football/lineups", async (req, res) => {
  try {
    const response = await axios.get(
      `https://v3.football.api-sports.io/fixtures/lineups?fixture=${req.query.matchId}`,
      { headers }
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

app.get("/api/football/schedule", async (req, res) => {
  try {
    const response = await axios.get(
      `http://api.isportsapi.com/sport/football/schedule?api_key=zLzxLcYyT8IAho7F&matchId=${req.query.matchId}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
