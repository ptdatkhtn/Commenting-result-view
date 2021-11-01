import React from 'react';
import ReactDOM from 'react-dom';
import RadarComments from './components/RadarComments'
import { mockRadarNodes } from './components/mockData'
import useSWR, { SWRConfig } from 'swr'
// import RatingResultsView from './components/RatingResultsView/RatingResultsView';
// import './scss/global-styles.scss';
import './translations'
import { startSession } from '@sangre-fp/connectors/session'
import './index.css';

//http://localhost:3010/?node=194688
const renderApp = (isSessionStarted, radarId) => {
    return (
        <React.StrictMode>
            <SWRConfig 
                value={{
                    // refreshInterval: 10000,
                    provider: () => new Map()
                    // fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
                }}
                >
                    <RadarComments dataSource={mockRadarNodes} radarId={radarId}/>
                </SWRConfig>
        </React.StrictMode>
    )
}

startSession().then((isSessionStarted) => {
    const appElements = document.getElementsByClassName('commenting-results-app')

    const defaultRadarId = (/node=\d+/.test(document.location.href) && document.location.href.replace(/^.*node=(\d+).*$/, '$1')) || null

    for (let el of appElements) {
        ReactDOM.render(
            renderApp(
                isSessionStarted,
                el.hasAttribute('data-radar-id') ? el.getAttribute('data-radar-id') : defaultRadarId,
            ),
            el
        )
    }
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
