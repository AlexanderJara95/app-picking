import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import authReducer from './auth/AuthReducer';
import usuarioReducers from './usuario/UsuarioReducers';

export default createStore(
    combineReducers({
        authReducer,
        usuarioReducers,
    }),
    composeWithDevTools(applyMiddleware(thunk))
)    