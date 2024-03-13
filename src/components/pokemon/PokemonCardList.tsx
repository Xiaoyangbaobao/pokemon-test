"use client"
import React, {useEffect, useState} from "react";
import Pokecard from "./PokemonCard";
import axios from "axios";
import PokemonEvolution from "./PokemonEvolution";


interface Ability {
  ability: {
    name: string;
  };
}

interface Move {
  move: {
    name: string;
  };
}

interface Stat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
  };
}

interface Type {
  type: {
    name: string;
  };
}

export interface PokeApiResponse {
  name: string;
  abilities: Ability[];
  moves: Move[];
  stats: Stat[];
  types: Type[];
  base_experience: number;
  height: number;
  weight: number;
  evolution_chain: {
    url: string;
  }
  cries: {
    latest: string,
  },
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
}


export type EvolutionChain = {
  speciesName: string;
  evolvesTo: EvolutionChain[];
};


const PokemonCard = () => {
  const [items, setItems] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [evolutionChain, setEvolutionChain] = useState<EvolutionChain | null>(null);
    const fetchRandomEvolutionChain = async () => {
        try {
          // Step 1: 获取所有种族的数量
          const speciesCountResponse = await axios.get('https://pokeapi.co/api/v2/pokemon-species/?limit=0');
          const speciesCount = speciesCountResponse.data.count;
  
          // 生成一个随机ID
          const rand = Math.floor(Math.random() * speciesCount) + 1
  
          // Step 2: 获取随机种族的进化链信息
          const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${rand}/`);
          const evolutionChainUrl = speciesResponse.data.evolution_chain.url;
  
          // 获取进化链详细信息
          const evolutionChainResponse = await axios.get(evolutionChainUrl);
          const chain = evolutionChainResponse.data.chain;
  
          const mapChainToEvolutionChain = (chain: any): EvolutionChain => ({
            speciesName: chain.species.name,
            evolvesTo: chain.evolves_to.map(mapChainToEvolutionChain),
          });
          setEvolutionChain(mapChainToEvolutionChain(chain));
        } catch (error) {
          console.error('Failed to fetch evolution chain', error);
        }
      };
  useEffect(() => {
  const fetchItems = async () => {
    let itemsData:any[] = [];
    setLoading(true);

    async function fetchPokemonDetails(pokemon: { url: string; }) {
      const response = await axios.get(pokemon.url);
      return response.data;
    }

    try {

      console.log("helloworld")
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${10}`);
      const data = await response.json();
      itemsData = itemsData.concat(data.results);
      const detailsPromises = itemsData.map(fetchPokemonDetails);
    const details = await Promise.all(detailsPromises);

    // 排序
    const sortedDetails = details.sort((a, b) => a.height - b.height);
      setItems(sortedDetails);
    } catch (error) {
      console.error("Fetching items failed:", error);
    }

    setLoading(false);
  };

  fetchItems();
  fetchRandomEvolutionChain();
}, []);
  return (
    <div>
      <h1>Pokemon Items</h1>
      <ul>
        {items.map((item: PokeApiResponse) => (
          <li key={item.name}>
            <Pokecard item={item}/>
          </li>
        ))}
      </ul>
      <PokemonEvolution evolutionChain={evolutionChain} />
      <button style={{
        width: 200,
        height: 100,
        borderRadius: '20px',
        fontSize: 24,
        margin: "40px 40px"
      }} onClick={async () => {
        await fetchRandomEvolutionChain();
      }}>Reroll</button>
    </div>
  );
};

export default PokemonCard;
