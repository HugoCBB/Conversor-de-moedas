import './Input.css'

const Input = () => {
    return (
        <main className='input'>
            <section className='input-title'>
                <h1>Conversor de moedas</h1>
            </section>
            <div className='input-fields'>
                <input placeholder='USD - DOLAR' />
                <input placeholder='BRL - REAL ' />
            </div>
            <button>Converter</button>
        </main>
    )
}

export default Input;
