import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { 
    employeeAllGetApi, 
    employeePostApi,
    employeePutApi,
    employeeDeleteApi,
} from "../apis/employee.api"

export const employeeAllGetSlice = createAsyncThunk(
    "employeeAllGetSlice",
    async (_ , thunkApi) => {
        try{
            return await employeeAllGetApi()
        }catch(error){
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const employeePostSlice = createAsyncThunk(
    "employeePostSlice",
    async (todo , thunkApi) => {
        try{
            return await employeePostApi(todo)
        }catch(error){
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const employeePutSlice = createAsyncThunk(
    "employeePutSlice",
    async (todo, thunkApi) => {
        try{
            return await employeePutApi(todo)
        }catch(error){
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const employeeDeleteSlice = createAsyncThunk(
    "employeeDeleteSlice",
    async (id, thunkApi) => {
        // console.log(id)
        try{
            await employeeDeleteApi(id)
            return id
        }catch(error){
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

const initialEmp = {
  id: '', name: '', email: '', job: '', pay:''
}
const initialState = {
  empTable: [],
  emp: initialEmp,
  mode: '',
  selectedId: ""
}

const employeeSlice = createSlice({
    name: "employeeSlice",
    initialState,
    reducers:{
        select: (state, action) => {
            state.selectedId = action.payload
        },
        setEmp: (state, action) => {
            state.emp = action.payload
        },
        setMode: (state,action) => {
            state.mode = action.payload
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(employeeAllGetSlice.pending, (state) => {
                     state.loading = true;
                     state.error = null;
            })
            .addCase(employeeAllGetSlice.fulfilled,  (state, action) => {
                    state.loading = false;
                    state.empTable = action.payload;
            })
            .addCase(employeeAllGetSlice.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
            })
            .addCase(employeePostSlice.fulfilled,  (state, action) => {
                    state.loading = false;
                    state.empTable = [...state.empTable, action.payload];
            })
            .addCase(employeePutSlice.fulfilled,  (state, action) => {
                    state.loading = false;
                    state.empTable = state.empTable.map(emp=>(
                        emp.id === state.selectedId ?
                        action.payload : emp
                ))
            })
            .addCase(employeeDeleteSlice.fulfilled,  (state, action) => {
                    state.loading = false;
                    state.empTable = state.empTable.filter(emp=>(
                        emp.id !== action.payload
                    ))
            })   
    }
})
export const {setMode, remove, register, update, select, setEmp } = employeeSlice.actions;
export default employeeSlice.reducer;