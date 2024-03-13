"use client"
import React, { useEffect, useState } from 'react';
import { EvolutionChain, PokeApiResponse } from './PokemonCardList';
import axios from 'axios';
import PokeInnercard from './PokeInnerCard';
// import "./pokecard.css";


export const PokemonEvolution = ({evolutionChain}: {evolutionChain: EvolutionChain | null}) =>  {
    
  
    const renderEvolutionChain = (chain: EvolutionChain) => (
      <div 
        key={chain.speciesName + chain.evolvesTo.join("-")}
        style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start'
      }}>
        <PokeInnercard item={{id: chain.speciesName }}/>
        {chain.evolvesTo.length > 0 && (
          <div style={{ paddingLeft: '20px' }}>
            {chain.evolvesTo.map((evo, index) => (
              <div key={index}>{renderEvolutionChain(evo)}</div>
            ))}
          </div>
        )}
      </div>
    );
  
    return (
      <div>
        <h2>Random Evolution Chain</h2>
        {evolutionChain ? renderEvolutionChain(evolutionChain) : <p>Loading...</p>}
      </div>
    );
      
  }


export default PokemonEvolution;