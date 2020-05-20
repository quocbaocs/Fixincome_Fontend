import React from 'react'
import TradingViewWidget, { Themes } from 'react-tradingview-widget';


const watchListItem=['USDVND']
 
export default class extends React.Component{
     render(){
       return(
        <div id='ViewChart'>
          <TradingViewWidget
          symbol="FX:GBPUSD"
          theme={Themes.DARK}
          locale="en"
          //calendar="true"
          timezone="Etc/UTC"
          watchlist={watchListItem}
          details={true}/>
       </div>
       ) 
     } 
}