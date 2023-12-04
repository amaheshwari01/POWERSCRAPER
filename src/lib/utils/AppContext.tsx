import { createContext } from 'react';

// Define the shape of your context state
interface IAppContext {
  default_data: any;
  setDefault_data: (default_data: any) => void;
  data: any;
  setData: (data: any) => void;
}

// Create the context with the initial state
const AppContext = createContext<IAppContext>({
  default_data: null,
  setDefault_data: () => {},
  data: null,
  setData: () => {},
});

export default AppContext;
