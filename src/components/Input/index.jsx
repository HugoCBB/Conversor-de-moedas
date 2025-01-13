import { useState, useEffect, useRef } from 'react';
import './Input.css';

const Input = ({ moeda }) => {
    const [filterSearchInput_1, setFilterSearchInput_1] = useState([]);
    const [inputSearch_1, setInputSearch_1] = useState("");

    const [filterSearchInput_2, setFilterSearchInput_2] = useState([]);
    const [inputSearch_2, setInputSearch_2] = useState("");

    const dropdownRef1 = useRef(null);
    const dropdownRef2 = useRef(null);

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

        const newFilter = moeda.filter((moeda) =>
            moeda.toLowerCase().includes(searchValue.toLowerCase())
        );

        setFilterSearchInput_1(newFilter);
    };

    const handleFilterInput_2 = (e) => {
        const searchValue = e.target.value;
        setInputSearch_2(searchValue);

        const newFilter = moeda.filter((moeda) =>
            moeda.toLowerCase().includes(searchValue.toLowerCase())
        );

        setFilterSearchInput_2(newFilter);
    };

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
            <button>Converter</button>
        </main>
    );
};

export default Input;
