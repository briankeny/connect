import { createSlice } from "@reduxjs/toolkit"
import { save} from "./storage"
export const dark = {
  color: "#fff",
  backgroundColor: "#111" ,
  cardBackground:"#222",
  postBackground:'rgba(29, 161, 242,0.1)'
}

export const light = {
  color: "#333", 
  backgroundColor: "#e6e6e6"  
}

const initialState = {
    isNightMode : false,
    theme: light
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
      setTheme : (state, action) =>{
          action.payload == 'dark' ? state.theme = dark : state.theme = light
      },
      toggleTheme : (state) =>{
        state.isNightMode = !(state.isNightMode)
        state.isNightMode ? state.theme = dark:  state.theme = light
        state.isNightMode? save('theme', 'light'): save('theme', 'dark')
      } 
    }
}
)

export const {setTheme,toggleTheme} = themeSlice.actions

export default  themeSlice.reducer

