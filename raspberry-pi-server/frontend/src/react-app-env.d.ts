/// <reference types="react-scripts" />
declare namespace NodeJS {
    interface ProcessEnv {
        readonly REACT_APP_BACKEND_URL: string;
        readonly REACT_APP_BASENAME: string;
    }
}
