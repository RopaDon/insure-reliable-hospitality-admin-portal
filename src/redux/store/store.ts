import { Store } from "redux";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { jobSlice } from "../slices/api/job-slice";
import { clientSlice } from "../slices/api/client-slice";
import { serviceSlice } from "../slices/api/service-slice";
import { industrySlice } from "../slices/api/industry-slice";
import { documentSlice } from "../slices/api/document-slice";
import { employeeSlice } from "../slices/api/employee-slice";
import { authenticationSlice } from "../slices/api/auth-slice";
import { RootState, persistedReducer } from "../reducers/persistedReducer";
import { FLUSH, PAUSE, PURGE, PERSIST, REGISTER, REHYDRATE } from "redux-persist";
import { waitlistSlice } from "../slices/api/waitlist-slice";
import { financeSlice } from "../slices/api/finance-slice";
import { integrationSlice } from "../slices/api/integration-slice";
import { staffSlice } from "../slices/api/staff-slice";

const store: Store<RootState, any> & {
  dispatch: any;
} = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([
      thunk,

      jobSlice.middleware,
      staffSlice.middleware,
      clientSlice.middleware,
      serviceSlice.middleware,
      financeSlice.middleware,
      employeeSlice.middleware,
      documentSlice.middleware,
      industrySlice.middleware,
      waitlistSlice.middleware,
      integrationSlice.middleware,
      authenticationSlice.middleware,
    ]),

  enhancers: [],
});

const persistor = persistStore(store);

const wrapper = createWrapper(() => store);

export { store, persistor, wrapper };
