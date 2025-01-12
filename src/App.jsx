
import { useEffect, useState } from "react";
import Axios from "axios";
import Input from "./components/Input"



function App() {
  const [moedas, setMoedas] = useState([]); // Inicialize como um array vazio

  async function getMoedas(key) {
      try {
          const response = await Axios.get(`https://v6.exchangerate-api.com/v6/${key}/latest/USD`);
          setMoedas(Object.keys(response.data.conversion_rates)); // Define as chaves como array
      } catch (error) {
          console.error("Erro na requisição: ", error);
      }
  }

  useEffect(() => {
      getMoedas("83fc1f2415e19e4528dd8644");
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
