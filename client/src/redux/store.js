import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { alertsReducer } from './reducers/alertReducer';
import { aboutReducer } from './reducers/aboutReducer';
import { projectReducer } from './reducers/projectReducer';
import { skillReducer } from './reducers/skillReducer';
import { experienceReducer } from './reducers/experienceReducer';

const composeEnhancers = composeWithDevTools({});
const rootReducer = combineReducers({
	aboutReducer,
	alertsReducer,
	projectReducer,
	skillReducer,
	experienceReducer,
});
const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk))
);

export default store;
