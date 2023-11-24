import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { baseurl } from "./api"
import { get} from "./storage"
import axios from "axios"

const initialState = {
    authentication: false,
    error:"",
    userData:{}, 
    lazyloading:true,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      setUser : (state,action)=> {
        state.userData = action.payload
      },
      logout: (state)=>{
        state.authentication = false 
      },
      setAuth : (state)=> {
        state.authentication = true
        state.lazyloading = false
      },
      setAuthError: (state,action) =>{
        state.error = action.payload
      }
    },
    extraReducers:(builder) => {
      builder
          .addCase(login.fulfilled, (state, action) => {
            state.userData = action.payload[0] 
            state.authentication = true
          })
          .addCase(login.pending, (state) => {
              state.authentication=false
              state.lazyloading=true
          })
          .addCase(login.rejected, (state,action:any) => {
              state.error = action?.error?.message
              state.authentication = false
              state.lazyloading = false
          })
  },
}
)

export const {setAuth,setUser,setAuthError,logout} = authSlice.actions

export default  authSlice.reducer



export const  login = createAsyncThunk( 
  'fetchuserdata',
  async () => {
    const token = await get('accessToken');
    const response = await  axios.get(`${baseurl}/profile`, {
      headers: {Authorization: `Bearer ${token}`},
    });
  return response.data;
})