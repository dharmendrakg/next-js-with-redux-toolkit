import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { NEXT_URL } from "@/config/index";
import Router from "next/router";
import axios from "axios";

export const signupUser = createAsyncThunk(
  "users/signupUser",
  async ({ username, email, password }, thunkAPI) => {
    try {
      const { data, status } = await axios.post(`${NEXT_URL}/api/register`, {
        username,
        email,
        password,
      });
      if (status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const { data, status } = await axios.post(`${NEXT_URL}/api/login`, {
        identifier: email,
        password,
      });
      if (status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "users/logout",
  async (_, thunkAPI) => {
    try {
      const { data, status } = await axios.post(`${NEXT_URL}/api/logout`);
      if (status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const checkUserLoggedIn = createAsyncThunk(
  "users/checkUserLoggedIn",
  async (_, thunkAPI) => {
    try {
      const { data, status } = await axios.get(`${NEXT_URL}/api/user`);
      if (status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    email: "",
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
  },
  extraReducers: {
    [signupUser.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.email = payload.user.email;
      state.username = payload.user.username;
      Router.push("/");
    },
    [signupUser.pending]: (state) => {
      state.isFetching = true;
    },
    [signupUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.email = payload.user.email;
      state.username = payload.user.username;
      state.isFetching = false;
      state.isSuccess = true;
      Router.push("/");
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [loginUser.pending]: (state) => {
      state.isFetching = true;
    },
    [checkUserLoggedIn.pending]: (state) => {
      state.isFetching = true;
    },
    [checkUserLoggedIn.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.email = payload.user.email;
      state.username = payload.user.username;
      Router.push("/");
    },
    [checkUserLoggedIn.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
      Router.push("/login");
    },

    [logoutUser.pending]: (state) => {
      state.isFetching = true;
    },
    [logoutUser.fulfilled]: (state) => {
      state.username = "";
      state.email = "";
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
      Router.push("/login");
    },
    [logoutUser.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
    },
  },
});

export const { clearState } = userSlice.actions;

export const userSelector = (state) => state.user;
