import React, { useEffect, useState } from 'react';
import logo from './logo.jpg';
import { MusicPlayer } from "./MusicPlayer";
import { Reset } from "styled-reset";

import './App.css';

const clientId = "XXXXXXXXXXXXX";
const clientSecret = "XXXXXXXXXXX";
const encodedValue = btoa(`${clientId}:${clientSecret}`);

const data = "grant_type=client_credentials";

const getAccessToken = async ():Promise<string> => {
  
  const responseToken = await fetch(`https://accounts.spotify.com/api/token`, {
    method: "POST",
    body: data,
    headers: {
      Authorization: `Basic ${encodedValue}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  const tokenData = await responseToken.json();

  return tokenData.access_token;
};
  
function App() {

  const [items, setItems] = useState([]);

  const fetchData = () => {
    getAccessToken()
      .then(async (token) => {
        const responce = await fetch(
          "https://api.spotify.com/v1/albums/1Wz9NN8BKFHKqpw8fmKmja",
          {
            headers: {
              Authorization: "Bearer " + token,
              Accept: "application/json",
              "Content-Type": "application/json;charset=utf-8",
            },
          }
        );
        const data = await responce.json();
        setItems(data.tracks.items);
      })
      .catch((statusCode) => console.error("データが取得できていません。", statusCode));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <Reset />
      <section className="section">
        <h1>
          <img src={logo} className="App-logo" alt="logo" />
        </h1>
        <h2 className="title">UNION</h2>
        <ul className="list">
          {items.map((item: any) => (
            <li>
              {item.track_number}................................ {item.name}{" "}
              <MusicPlayer src={item.preview_url} />
            </li>
          ))}
        </ul>
      </section>
      <footer className="App-footer">
        <p>twitter / instagram / buy</p>
      </footer>
    </div>
  );
}

export default App;
