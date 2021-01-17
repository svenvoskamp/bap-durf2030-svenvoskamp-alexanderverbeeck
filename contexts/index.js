import { createContext } from 'react';
import RootStore from '../stores';

const stores = new RootStore();

export const storesContext = createContext(stores);
