"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import { PokeApiResponse } from './PokemonCardList';
import axios from 'axios';
import PokeInnercard from './PokeInnerCard';
const Pokecard = ({item}:{item? : PokeApiResponse}) =>  {
      const audio = new Audio(item?.cries.latest);
      const playSound = () => {
        audio.play().catch(error => console.error('Error playing sound:', error));
      };
      return (
        <div style={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div className="Pokecard">
                <h1 className="Pokecard-title">{item?.name}</h1>
                <div className="Pokecard-image" onClick={() => {
                    playSound();
                }}>
                    <img src={item?.sprites?.other['official-artwork']?.front_default || ""} alt={item?.name} width={300} height={300} />
                </div>
                <div className="Pokecard-data">Height: {item?.height}</div>
                { item?.types?.find(value => value.type.name === "fire") && <div className="Pokecard-data">Fire Attack Stats: {item?.stats[1].base_stat}</div>}

            </div>
          </div>
      )
      
  }


export default Pokecard;