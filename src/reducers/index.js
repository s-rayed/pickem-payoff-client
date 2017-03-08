import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import gameDataReducer from './game_data_reducer.js';
import updateUserDailyChoiceReducer from './update_user_daily_choice';

const rootReducer = combineReducers({
  form: form,
  auth: authReducer,
  gameData: gameDataReducer,
  updateUserDailyChoice: updateUserDailyChoiceReducer
});

export default rootReducer;
