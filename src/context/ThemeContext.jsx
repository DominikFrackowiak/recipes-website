import { createContext, useReducer, useEffect } from 'react'

export const ThemeContext = createContext()

const themeReducer = (state, action) => {
	console.log(action)
	console.log(state)
	switch(action.type){
		case 'CHANGE_COLOR':
			return {...state, color: action.payload}
		default:
			 return state
	}
}

export function ThemeProvider({ children }) {
	const [state, dispatch] = useReducer(themeReducer, {
		color: 'pink',
	})

	const changeColor = color => {
		dispatch({ type: 'CHANGE_COLOR', payload: color })
	}

	// changeColor('royalblue')

 // useEffect(()=>{
 //    console.log(state.color)
	// }, [state])

	return (
		<ThemeContext.Provider value={{...state, changeColor}}>
			{children}
		</ThemeContext.Provider>
	)
}
