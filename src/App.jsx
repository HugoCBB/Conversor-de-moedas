
import { useEffect, useState } from "react";
import Input from "./components/Input"
import axios from "axios";



function App() {
  const key = "83fc1f2415e19e4528dd8644"
  const [moedas, setMoedas] = useState([]);
  const [moedasConvertidas,setMoedasConvertidas] = useState([]);


  useEffect(() => {
    const getMoedas = async () => {
    try {
      const [response1, response2] = await Promise.all([
        axios.get(`https://v6.exchangerate-api.com/v6/${key}/latest/USD`),
        axios.get(`https://v6.exchangerate-api.com/v6/${key}/pair/EUR/BRL/1`)
      ]);

      setMoedas(Object.keys((response1.data.conversion_rates)))
      setMoedasConvertidas(response2.data)

    } catch (error) {
      console.error("Erro na requisição: ", error);
      
    }}
    getMoedas()
  }, []);

  return (
    <>
      <Input 
      moeda={moedas}
      />
    </>
  )
}

export default App
