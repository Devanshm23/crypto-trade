import { createContext , useEffect, useState} from "react";

export const CoinContext =   createContext()
const CoinContextProvider = (props)=> {

  const [allCoins, setAllCoins] = useState([])
  const [currency, setCurrency] = useState({
    name:"inr",
    symbol:"₹"
  })

  useEffect(() => {
    fetchAllCoin();
  }, [currency])
  

  const fetchAllCoin = async ()=> {
          const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`;
          const options = {method: 'GET', headers: {'x-cg-demo-api-key': 'CG-UYNjv5hdSoUtnoTXwbdfu7ys'}, body: undefined};

          try {
            const response = await fetch(url, options);
            const data = await response.json();
            setAllCoins(data);
          } catch (error) {
            console.error(error);
          }
   }

      const contextValue = {
        allCoins,currency,setCurrency
      }

      return (
        <CoinContext.Provider value={contextValue}>    
          {props.children}
        </CoinContext.Provider>

      )
}

export default CoinContextProvider