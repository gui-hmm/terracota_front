import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from './reducers/auth';

// Imports necessários do redux-persist
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storageFromSession from 'redux-persist/lib/storage/session'; // Para usar sessionStorage

// 1. Combinar os reducers
// Mesmo que você só tenha um ('auth'), usar combineReducers facilita
// adicionar outros no futuro.
const rootReducer = combineReducers({
    auth: authSlice,
    // Ex: product: productSlice,
});

// 2. Criar a configuração de persistência
const persistConfig = {
  key: 'root', // Chave raiz no storage
  storage: storageFromSession, // Define o sessionStorage como o local de armazenamento
  whitelist: ['auth'] // Especifica quais "slices" do estado devem ser salvos.
                      // No seu caso, queremos salvar apenas o estado de autenticação.
};

// 3. Criar o "reducer persistido"
// Isso envolve o seu rootReducer com a configuração de persistência.
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Configurar a store
export const store = configureStore({
  // Use o reducer persistido aqui
  reducer: persistedReducer,
  // Adicionar este middleware é recomendado pelo redux-persist para evitar erros
  // de "valor não-serializável" no console.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// 5. Criar e EXPORTAR o persistor
// Esta é a linha que faltava e que causa o erro.
export const persistor = persistStore(store);

// Seus tipos exportados continuam exatamente os mesmos e funcionarão como antes.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;