import { useState } from 'react';
import './Input.css'

const Input = ({moeda}) => {

    const [isFocus, setIsFocus] = useState(false);


    return (
        <main className='input'>
            <section className='input-title'>
                <h1>Conversor de moedas</h1>
            </section>
            <div className='input-fields'>
                            
                <div className='input-group'>
                    <input
                        placeholder='USD - DOLAR'
                        onFocus={() => setIsFocus(true)}
                    />
                    {isFocus && (
                        <div className='dropdown'>
                            {moeda.map((moedas) => (
                                <div key={moedas}>{moedas}</div>
                            ))}
                        </div>
                    )}
                </div>
                <input placeholder='BRL - REAL ' />
            </div>
            <button>Converter</button>
        </main>
    )
}

export default Input;
