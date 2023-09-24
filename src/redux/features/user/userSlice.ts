import { auth } from '@/lib/firebasecofig';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { is } from 'date-fns/locale';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

interface IUser {
  user:{
    email:string | null
  },
  isLoading:boolean;
  isError:boolean;
  error:string | null
}

interface ICredential{
    email:string;
    password:string
}

const initialState: IUser = {
  user:{
    email:null
  },
  isError:false,
  isLoading:false,
  error:null
};

export const createUser=createAsyncThunk("user/createUser",async({email,password}:ICredential)=>{
const data= await createUserWithEmailAndPassword(auth, email, password)
return data.user.email
})

export const loginUser=createAsyncThunk("user/loginUser",async({email,password}:ICredential)=>{
    const data= await signInWithEmailAndPassword(auth, email, password)
    return data.user.email
    })

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser:(state,action:PayloadAction<string | null>)=>{
        state.user.email=action.payload
    },
    setLoading:(state,action:PayloadAction<boolean>)=>{
        state.isLoading=action.payload
    },
  },
  extraReducers:(builder)=>{
    builder.addCase(createUser.pending,(state)=>{
    state.isError=true

    }).addCase(createUser.fulfilled,(state,action)=>{
    state.user.email=action.payload
    state.isLoading=false
    }).addCase(createUser.rejected,(state,action)=>{
        state.user.email=null
        state.isError=true
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        state.error=action.error.message!
    }).addCase(loginUser.pending,(state)=>{
        state.isError=true
    
        }).addCase(loginUser.fulfilled,(state,action)=>{
        state.user.email=action.payload
        state.isLoading=false,
        state.isError=false
        }).addCase(loginUser.rejected,(state,action)=>{
            state.user.email=null
            state.isError=true
            state.isLoading=false
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            state.error=action.error.message!
        })
  }
});

export const {setUser,setLoading}=userSlice.actions
export default userSlice.reducer;
