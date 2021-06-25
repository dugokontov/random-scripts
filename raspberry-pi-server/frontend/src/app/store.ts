import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { storagesApi } from './storagesApi';
import { sectionsApi } from './sectionsApi';

export const store = configureStore({
    reducer: {
        // TODO: remove this reducer
        counter: counterReducer,
        [storagesApi.reducerPath]: storagesApi.reducer,
        [sectionsApi.reducerPath]: sectionsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(storagesApi.middleware)
            .concat(sectionsApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
