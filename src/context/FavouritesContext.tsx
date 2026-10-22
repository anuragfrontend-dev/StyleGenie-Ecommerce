import { createContext, useContext, useEffect, useReducer } from "react"

type LikeAction = { type: 'ADD_TO_FAVOURITES'; payload: number }

interface likeState {
  like: number[]
}

interface FavouritesContextType {
  like: number[];
  dispatch: React.Dispatch<LikeAction>
}


export const FavouritesContext = createContext<FavouritesContextType | undefined>(undefined);

const initialState: likeState = {
  like: JSON.parse(localStorage.getItem('like') || '[]')
}

function favouriteReducer(state: likeState, action: LikeAction): likeState {
  switch (action.type) {
    case 'ADD_TO_FAVOURITES':
      if (state.like.includes(action.payload)) {
        return { like: state.like.filter((id) => id !== action.payload) }
      }
      else {
        return { like: [...state.like, action.payload] };
      }
    default:
      return state;
  }
}

export function FavouritesProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(favouriteReducer, initialState);

  useEffect(() => {
    localStorage.setItem('like', JSON.stringify(state.like));
  }, [state.like])


  return (
    <FavouritesContext.Provider value={{ like: state.like, dispatch }}>
      {children}
    </FavouritesContext.Provider>
  )
}

export function useFavourites() {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error('Please write all components inside FavouritesProvider');
  }
  return context;
}