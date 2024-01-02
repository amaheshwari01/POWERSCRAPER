import { set } from 'firebase/database';
import { createContext } from 'react';

// Define the shape of your context state
interface IAppContext {
  default_data: any;
  setDefault_data: (default_data: any) => void;
  data: any;
  setData: (data: any) => void;
  refresh_token: string;
  setRefreshToken: (data: any) => void;
  runFetch: boolean;
  setRunFetch: (data: any) => void;
  loading: boolean;
  setLoading: (data: any) => void;
  weights: any;
  setWeights: (data: any) => void;
}

// Create the context with the initial state
const AppContext = createContext<IAppContext>({
  default_data: null,
  setDefault_data: () => { },
  data: null,
  setData: () => { },
  refresh_token: '',
  setRefreshToken: () => { },
  runFetch: false,
  setRunFetch: () => { },
  loading: false,
  setLoading: () => { },
  weights: null,
  setWeights: () => { },

});

export default AppContext;
