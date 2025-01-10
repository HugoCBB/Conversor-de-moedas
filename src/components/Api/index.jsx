import axios, { Axios } from "axios"
import { useEffect, useState } from "react"


const Api = () => {
    
    const [moedas, setMoedas] = useState('')

    async function getMoedas() {
        try {
            const response =  await axios.get(`https://v6.exchangerate-api.com/v6/83fc1f2415e19e4528dd8644/latest/USD`)
            setMoedas(Object.keys(response.data.conversion_rates))
        } catch (error) {
            console.error("Erro na requisicao: ", error)
            
        }
        
    }

    useEffect(() => {
        getMoedas()
    }, [])

    return (
        <ul>
            {moedas.map((moeda) => (<li key={moeda}>{moeda}</li>))}
        </ul>

    )

}

export default Api;