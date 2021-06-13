import React, { useEffect, useState } from "react";

export default function Lists() {
  const [lists, setLists] = useState([]);
  const [firstEpisodes, setFirstEpisodes] = useState([]);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((res) => res.json())
      .then((data) => setLists(data.results));
  }, []);

  useEffect(async () => {
    const temp = [];
    for (let i = 0; i < lists.length; i++) {
      const response = await fetch(lists[i].episode[0]);
      const firstEpisode = await response.json();
      const data = firstEpisode.name;
      temp.push(data);
    }
    setFirstEpisodes(temp);
  }, []);

  return (
    <>
      <div class="card-container">
        {lists.map((list, index) => (
          <div class="card">
            <img src={list.image} width="150" />
            <div class="details">
              <div class="name">{list.name}</div>
              <span>{list.status}</span>
              <span>{list.species}</span>
              <div class="name">Last Known Location:</div>
              <span>{list.location.name}</span>
              <div class="name">First Seen In:</div>
              <span>{firstEpisodes[index]}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
