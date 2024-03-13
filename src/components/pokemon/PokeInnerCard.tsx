"use client"
import React, { useEffect, useState } from 'react';
import { PokeApiResponse } from './PokemonCardList';
import Pokecard from './PokemonCard';
// import "./pokecard.css";
const PokeInnercard = ({item}:{item? : {id: string | number}}) =>  {
      const [poke, setPoke] = useState<PokeApiResponse>();
      useEffect(() => {
        const fetchItems = async () => {
      
          try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${item?.id}/`);
            const data = await response.json();
            setPoke(data);
          } catch (error) {
            console.error("Fetching items failed:", error);
          }
        };
        
      
        fetchItems();
      }, []);
  
      return (
            <div style={{

            }}>
                <Pokecard item={poke} />
            </div>
      )
      
  }


export default PokeInnercard;