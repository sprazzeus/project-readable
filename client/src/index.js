import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { compose, createStore, applyMiddleware } from "redux"
import { BrowserRouter as Router } from "react-router-dom"
import App from "./components/App"
import registerServiceWorker from "./registerServiceWorker"
import thunk from "redux-thunk"
import rootReducer from "./reducers"
import { Provider as RebassProvider } from "rebass"
import { injectGlobal } from "styled-components"

injectGlobal`
  * { box-sizing: border-box; }
  body { margin: 0; }
`

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<RebassProvider>
				<App />
			</RebassProvider>
		</Router>
	</Provider>,
	document.getElementById("root")
)
registerServiceWorker()