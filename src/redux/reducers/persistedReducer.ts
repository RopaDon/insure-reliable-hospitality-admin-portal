import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import { jobSlice } from "../slices/api/job-slice";
import authSlice from "../slices/local/auth.slice";
import localStorage from "redux-persist/es/storage";
import { PersistConfig } from "redux-persist/es/types";
import { clientSlice } from "../slices/api/client-slice";
import loadingSlice from "../slices/local/loading-slice";
import { serviceSlice } from "../slices/api/service-slice";
import { employeeSlice } from "../slices/api/employee-slice";
import { documentSlice } from "../slices/api/document-slice";
import { industrySlice } from "../slices/api/industry-slice";
import { authenticationSlice } from "../slices/api/auth-slice";
import { waitlistSlice } from "../slices/api/waitlist-slice";
import { financeSlice } from "../slices/api/finance-slice";
import { integrationSlice } from "../slices/api/integration-slice";

const persistanceConfiguartion: PersistConfig<any, any, any> = {
  key: "persist",
  whitelist: ["auth"],
  blacklist: ["loading"],
  storage: localStorage,
};

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [jobSlice.reducerPath]: jobSlice.reducer,
  [loadingSlice.name]: loadingSlice.reducer,
  [clientSlice.reducerPath]: clientSlice.reducer,
  [serviceSlice.reducerPath]: serviceSlice.reducer,
  [financeSlice.reducerPath]: financeSlice.reducer,
  [employeeSlice.reducerPath]: employeeSlice.reducer,
  [documentSlice.reducerPath]: documentSlice.reducer,
  [industrySlice.reducerPath]: industrySlice.reducer,
  [waitlistSlice.reducerPath]: waitlistSlice.reducer,
  [integrationSlice.reducerPath]: integrationSlice.reducer,
  [authenticationSlice.reducerPath]: authenticationSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export const persistedReducer = persistReducer<any, any>(persistanceConfiguartion, rootReducer);
