import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
    todoAllGetApi, 
    todoPostApi,
    todoPutApi,
    todoDeleteApi,
} from "../apis/todo.api"

export const todoAllGetSlice = createAsyncThunk(
    "todoAllGetSlice",
    async (_ , thunkApi) => {
        try{
            return await todoAllGetApi()
        }catch(error){
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const todoPostSlice = createAsyncThunk(
    "todoPostSlice",
    async (todo , thunkApi) => {
        try{
            return await todoPostApi(todo)
        }catch(error){
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const todoPutSlice = createAsyncThunk(
    "todoPutSlice",
    async (todo, thunkApi) => {
        try{
            return await todoPutApi(todo)
        }catch(error){
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const todoTogglePutSlice = createAsyncThunk(
    "todoTogglePutSlice",
    async (todo, thunkApi) => {
        const newTodo = {...todo, checked: !todo.checked}
        try{
            return await todoPutApi(newTodo)
        }catch(error){
            return thunkApi.rejectWithValue(error.message)
        }
    }
)


export const todoDeleteSlice = createAsyncThunk(
    "todoDeleteSlice",
    async (id, thunkApi) => {
        console.log(id)
        try{
            await todoDeleteApi(id)
            return id
        }catch(error){
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

const initialState = {
  todoList: [],
  loading: false,
  error: null
};

const todoSlice = createSlice({
  name: "todoSlice",
  initialState,
  reducers: {
  },
  extraReducers: (builder) =>{
    builder
        .addCase(todoAllGetSlice.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(todoAllGetSlice.fulfilled,  (state, action) => {
                state.loading = false;
                state.todoList = action.payload;
        })
        .addCase(todoAllGetSlice.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
        })
        .addCase(todoPostSlice.fulfilled,  (state, action) => {
                state.loading = false;
                state.todoList = [...state.todoList, action.payload];
        })
        .addCase(todoPutSlice.fulfilled,  (state, action) => {
                state.loading = false;
                state.todoList = state.todoList.map((todo) =>
                    todo.id === action.payload.id
                        ? action.payload
                        : todo
                );
        })
        .addCase(todoTogglePutSlice.fulfilled,  (state, action) => {
                state.loading = false;
                state.todoList = state.todoList.map((todo) =>
                    todo.id === action.payload.id ? 
                    action.payload : todo,
                );
        })
        .addCase(todoDeleteSlice.fulfilled,  (state, action) => {
                state.loading = false;
                state.todoList = state.todoList.filter(
                    (todo) => todo.id !== action.payload,
                );
        })
  }
});

export const { remove, update, register, toggle, change } = todoSlice.actions;
export default todoSlice.reducer;
