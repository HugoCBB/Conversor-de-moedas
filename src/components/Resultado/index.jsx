import './Resultado.css'

const Resultado = ({moedasConvertidas}) => {
    return (
        <section className="resultado">
            {moedasConvertidas === null && <p>Carregando...</p>}
    
            {moedasConvertidas && !moedasConvertidas.error && (
                <div className=''>
                    <h2>Resultado da Conversão</h2>
                    <p>Taxa de conversão: {moedasConvertidas.conversion_rate}</p>
                    <p>Resultado: {moedasConvertidas.conversion_result}</p>
                </div>
            )}
    
            {moedasConvertidas && moedasConvertidas.error && (
                <p>Ocorreu um erro ao realizar a conversão. Tente novamente.</p>
            )}
        </section>
    )
}

export default Resultado;