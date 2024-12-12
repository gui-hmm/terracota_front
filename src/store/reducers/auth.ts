import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/api";

interface User {
  email: string;
  name: string;
  cpf: string;
  contact: string;
  role: 'CUSTOMER' | 'CRAFTSMAN' | 'COMPANY';
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  registrationSuccess: boolean;
}

interface LoginResponse {
  user: User;
  token: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  email: string;
  name: string;
  cpf: string;
  contact: string;
  role: string;
  password: string;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  registrationSuccess: false,
};

// Login action
export const login = createAsyncThunk<
  LoginResponse,
  LoginCredentials,
  { rejectValue: string }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await api.post("/auth/login", credentials);
    // Store token in localStorage only after successful login
    sessionStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Erro ao realizar login."
    );
  }
});

// Register action - now doesn't handle token
export const register = createAsyncThunk<
  { message: string },
  RegisterCredentials,
  { rejectValue: string }
>("auth/register", async (credentials, { rejectWithValue }) => {
  try {
    const formattedCredentials = {
      ...credentials,
      role: credentials.role.toUpperCase()
    };
    
    const response = await api.post("/customer", formattedCredentials);
    return { message: "Cadastro realizado com sucesso!" };
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Erro ao realizar cadastro."
    );
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      sessionStorage.removeItem('token');
    },
    clearRegistrationSuccess(state) {
      state.registrationSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erro desconhecido.";
      })
      // Register cases
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.registrationSuccess = false;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.registrationSuccess = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erro desconhecido.";
        state.registrationSuccess = false;
      });
  },
});

export const { logout, clearRegistrationSuccess } = authSlice.actions;
export default authSlice.reducer;