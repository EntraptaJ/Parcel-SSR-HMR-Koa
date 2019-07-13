import { AppState } from 'server/server';

declare global {
  interface Window {
    APP_STATE: AppState;
  }
}
