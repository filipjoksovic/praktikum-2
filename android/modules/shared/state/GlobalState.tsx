import {useState, createContext, useContext} from 'react';

export interface IGlobalStateProps {
  count: string;
}

const initialState = {
  count: 0,
};

const GlobalContext = createContext(null);

export const GlobalState = (props: IGlobalStateProps) => {
  // declare the GlobalState
  const [globalState, setGlobalState] = useState({});

  // create a function that'll make it easy to update one state property at a time
  const updateGlobalState = (key: string, newValue: any) => {
    setGlobalState((oldState: IGlobalStateProps) => {
      if (oldState[key] !== newValue) {
        const newState = {...oldState};
        newState[key] = newValue;
        return newState;
      } else {
        return oldState;
      }
    });
  };

  return (
    <GlobalContext.Provider value={[globalState, updateGlobalState]}>
      {props.children}
    </GlobalContext.Provider>
  );
};

// custom hook for retrieving the provided state
export const useGlobalState = () => useContext(GlobalContext);
