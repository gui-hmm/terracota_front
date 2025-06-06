import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/api";

interface User {
  id: string;
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
  phone: string;
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

export const login = createAsyncThunk<
  LoginResponse,
  LoginCredentials,
  { rejectValue: string }
>("auth", async (credentials, { rejectWithValue }) => {
  try {
    const response = await api.post("/auth", credentials);
    sessionStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Erro ao realizar login."
    );
  }
});

export const register = createAsyncThunk<
  { message: string },
  RegisterCredentials,
  { rejectValue: string }
>("auth/register", async (credentials, { rejectWithValue }) => {
  const { role, ...rest } = credentials;

  const endpointMap: Record<string, string> = {
    CUSTOMER: "/customers",
    CRAFTSMAN: "/craftsmen",
    COMPANY: "/companies",
  };

  const roleUpper = role.toUpperCase();
  const endpoint = endpointMap[roleUpper];

  if (!endpoint) {
    return rejectWithValue("Tipo de usuário inválido.");
  }

  try {
    const payload = {
      ...rest,
      user_role: roleUpper,
      is_active: true,
    };
    await api.post(endpoint, payload);
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