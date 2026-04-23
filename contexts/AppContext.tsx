import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { channels as initialChannels, matches as initialMatches, Channel, Match } from '../services/mockData';

interface AppContextType {
  channels: Channel[];
  matches: Match[];
  favoriteChannels: string[];
  favoriteMatches: string[];
  toggleFavoriteChannel: (id: string) => void;
  toggleFavoriteMatch: (id: string) => void;
  updateChannelStream: (id: string, url: string) => void;
  activeFilter: string;
  setActiveFilter: (f: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const AppContext = createContext<AppContextType>({} as AppContextType);

export function AppProvider({ children }: { children: ReactNode }) {
  const [channels, setChannels] = useState<Channel[]>(initialChannels);
  const [matches] = useState<Match[]>(initialMatches);
  const [favoriteChannels, setFavoriteChannels] = useState<string[]>([]);
  const [favoriteMatches, setFavoriteMatches] = useState<string[]>(['m1', 'm2', 'm7', 'm11']);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('favoriteChannels').then(d => {
      if (d) setFavoriteChannels(JSON.parse(d));
    });
    AsyncStorage.getItem('favoriteMatches').then(d => {
      if (d) setFavoriteMatches(JSON.parse(d));
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('favoriteChannels', JSON.stringify(favoriteChannels));
  }, [favoriteChannels]);

  useEffect(() => {
    AsyncStorage.setItem('favoriteMatches', JSON.stringify(favoriteMatches));
  }, [favoriteMatches]);

  const toggleFavoriteChannel = (id: string) => {
    setFavoriteChannels(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleFavoriteMatch = (id: string) => {
    setFavoriteMatches(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const updateChannelStream = (id: string, url: string) => {
    setChannels(prev =>
      prev.map(c => (c.id === id ? { ...c, streamUrl: url } : c))
    );
  };

  return (
    <AppContext.Provider
      value={{
        channels,
        matches,
        favoriteChannels,
        favoriteMatches,
        toggleFavoriteChannel,
        toggleFavoriteMatch,
        updateChannelStream,
        activeFilter,
        setActiveFilter,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
