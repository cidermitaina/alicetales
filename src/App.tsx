import React, { useEffect, useState } from 'react';
import logo from './logo.jpg';
import { MusicPlayer } from "./MusicPlayer";
import { Reset } from "styled-reset";

import './App.css';

const clientId = "XXXXXXXXXXXX";
const clientSecret = "XXXXXXXXXXXXXX";
const encodedValue = btoa(`${clientId}:${clientSecret}`);

const data = "grant_type=client_credentials";

const getAccessToken = async () => {
  try {
    const responseToken = await fetch(
      `https://accounts.spotify.com/api/token`,
      {
        method: "POST",
        body: data,
        headers: {
          Authorization: `Basic ${encodedValue}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (!responseToken.ok) {
      throw new Error(`${responseToken.status}: ${responseToken.statusText}`);
    } else {
      const tokenData = await responseToken.json();
      return tokenData.access_token;
    }
    
  } catch (error) {
    console.error(`AccessToken取得でエラーが発生しました (${error})`);
  }
};
  
function App() {

  const [items, setItems] = useState([]);

  const fetchData = async () => {
    const accesToken = await getAccessToken();
    const responce = await fetch(
      "https://api.spotify.com/v1/albums/1Wz9NN8BKFHKqpw8fmKmja",
      {
        headers: {
          Authorization: "Bearer " + accesToken,
          Accept: "application/json",
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    );
      
    const data = await responce.json();
    return data.tracks.items; 
  };

  useEffect(() => {
    fetchData()
      .then((data) => {
        setItems(data);
      })
      .catch((error) => console.error("データが取得できませんでした。", error));
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
