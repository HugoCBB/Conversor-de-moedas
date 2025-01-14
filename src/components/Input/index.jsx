import { useState, useEffect, useRef } from 'react';
import axios from "axios";
import './Input.css';
import Resultado from '../Resultado';

const Input = () => {
    const key = "83fc1f2415e19e4528dd8644"
    const [moedas, setMoedas] = useState([]);

    const [moedasConvertidas,setMoedasConvertidas] = useState(null);
    
    const [filterSearchInput_1, setFilterSearchInput_1] = useState([]);
    const [inputSearch_1, setInputSearch_1] = useState("");

    const [filterSearchInput_2, setFilterSearchInput_2] = useState([]);
    const [inputSearch_2, setInputSearch_2] = useState("");

    const [quantidadeDeMoedas, setQuantidadeDeMoedas] = useState("");
    const [converterQuantidadeDeMoedas, setConverterQuantidadeDeMoedas] = useState()
    const [converterDe, setConverterDe] = useState("")
    const [converterPara, setConverterPara] = useState("")

    const [triggerConversion, setTriggerConversion] = useState(false);

    const dropdownRef1 = useRef(null);
    const dropdownRef2 = useRef(null);

    // PEGA TODAS AS MOEDAS EXISTENTES NA API UTILIZANDO COMO BASE O DOLAR AMERICANO
    useEffect(() => {
        const getMoedas = async () => {
            try {
            
            const response = await axios.get(`https://v6.exchangerate-api.com/v6/${key}/latest/USD`)
                setMoedas(Object.keys((response.data.conversion_rates))) 
                
                
                
            } catch (error) {
                console.error("Erro na requisição: ", error);
                
            }}
            getMoedas()
        }, []);
        
        // CONVERTE A MOEDA DE ACORDO COM A ESCOLHA DO USUARIO
        useEffect(() => {
            if (triggerConversion && converterDe && converterPara && quantidadeDeMoedas) {
                
                const conversion = async () => {
                    try {
                        setMoedasConvertidas(null)
                        
                        const response = await axios.get(`https://v6.exchangerate-api.com/v6/${key}/pair/${converterDe}/${converterPara}/${converterQuantidadeDeMoedas}`)
                        setMoedasConvertidas(response.data)
                        console.log(response.data);
                
                    
                
                } catch (error) {
                            console.error("Erro na requisição: ", error);
                        
                        }
                    }
                    conversion()
                    setTriggerConversion(false);

        }

        }, [triggerConversion, converterDe, converterPara, converterQuantidadeDeMoedas]);

    // EFEITO PARA SAIR DO DROPDOWN CLICANDO EM QUALQUER PARTE DA TELA
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef1.current && !dropdownRef1.current.contains(event.target)) {
                setFilterSearchInput_1([]);
            }
            if (dropdownRef2.current && !dropdownRef2.current.contains(event.target)) {
                setFilterSearchInput_2([]);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // FILTRAR MOEDAS PARA CONVERTER
    const handleFilterInput_1 = (e) => {
        const searchValue = e.target.value;
        setInputSearch_1(searchValue);

        const newFilter = moedas.filter((moeda) =>
            moeda.toLowerCase().includes(searchValue.toLowerCase())
        );

        setFilterSearchInput_1(newFilter);
    };
    
    // FILTRAR MOEDAS PARA CONVERTER
    const handleFilterInput_2 = (e) => {
        const searchValue = e.target.value;
        setInputSearch_2(searchValue);

        const newFilter = moedas.filter((moeda) =>
            moeda.toLowerCase().includes(searchValue.toLowerCase())
        );

        setFilterSearchInput_2(newFilter);
    };


    const quantidade = (e) => {
        const quantidadeDeMoedasValue = e.target.value;
        setQuantidadeDeMoedas(quantidadeDeMoedasValue)

    }

    const conversionMoedas = () => {
        setConverterDe(inputSearch_1);
        setConverterQuantidadeDeMoedas(quantidadeDeMoedas);
        setConverterPara(inputSearch_2);
        setTriggerConversion(true);
    }

    
    return (
        <main className='input'>
            <section className='input-title'>
                <h1>Conversor de moedas</h1>
            </section>
            <div className='input-fields'>
                <div className='input-group'>
                    
                    <input
                        value={inputSearch_1}
                        onChange={handleFilterInput_1}
                        placeholder='USD - DOLAR'
                    />
                    {filterSearchInput_1.length > 0 && (
                        <div className='dropdown' ref={dropdownRef1}>
                            {filterSearchInput_1.map((moeda) => (
                                <div key={moeda}>{moeda}</div>
                            ))}
                        </div>
                    )}
                    <input
                        value={quantidadeDeMoedas}
                        onChange={quantidade}
                        placeholder='Quantidade de moedas'
                    
                    />
                    <input
                        value={inputSearch_2}
                        onChange={handleFilterInput_2}
                        placeholder='BRL - REAL'
                    />
                    {filterSearchInput_2.length > 0 && (
                        <div className='dropdown' ref={dropdownRef2}>
                            {filterSearchInput_2.map((moeda) => (
                                <div key={moeda}>{moeda}</div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <button onClick={conversionMoedas}>Converter</button>
            
            <Resultado
            moedasConvertidas={moedasConvertidas}
            />
        </main>
    );
};

export default Input;
