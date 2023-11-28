import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import Error from './Error'
import useSelectMonedas from '../hooks/useSelectMonedas'
import { monedas } from '../data/monedas'

// Estilos para el formulario
const Form = styled.form`
  width: 100%;
`

// Estilos para el botón de envío
const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-top: 30px;

  &:hover {
    background-color: #7a7dfe;
    cursor: pointer;
  }
`

// Componente funcional para el formulario de cotización
function Formulario({ setCurrencies }) {
  // Estado para almacenar las 10 principales cryptomonedas solicitadas a la API
  const [cryptos, setCryptos] = useState([])
  const [error, setError] = useState(false)

  // Hook personalizado para pintar el select y obtener el valor de la moneda correspondiente
  const [currency, SelectCurrencies] = useSelectMonedas(
    'Elige tu moneda',
    monedas
  )

  // Hook personalizado para pintar el select y obtener el valor de la cryptomoneda correspondiente
  const [cryptoCurrency, SelectCryptoCurrency] = useSelectMonedas(
    'Elige tu CryptoMoneda',
    cryptos
  )

  // Efecto para obtener las 10 principales cryptomonedas desde la API al cargar el componente
  useEffect(() => {
    const getApi = async () => {
      const url =
        'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
      const response = await fetch(url)

      const result = await response.json()

      // Mapeo de datos para obtener un array de objetos con id y name
      const cryptosArray = result.Data.map((crypto) => {
        const obj = {
          id: crypto.CoinInfo.Name,
          name: crypto.CoinInfo.FullName
        }
        return obj
      })
      setCryptos(cryptosArray)
    }
    getApi()
  }, [])

  // Función para manejar la presentación del formulario
  const handleSubmit = (e) => {
    e.preventDefault()

    // Validación de campos obligatorios
    if ([currency, cryptoCurrency].includes('')) {
      setError(true)
      return
    }

    // Limpieza de error y actualización del estado de las monedas
    setError(false)
    setCurrencies({
      currency,
      cryptoCurrency
    })
  }

  return (
    <>
      {error && <Error>Todos los campos son obligatorios</Error>}
      <Form onSubmit={(e) => handleSubmit(e)}>
        <SelectCurrencies />
        <SelectCryptoCurrency />
        <InputSubmit type='submit' value='cotizar' />
      </Form>
    </>
  )
}

// Propiedades esperadas para el componente
Formulario.propTypes = {
  setCurrencies: PropTypes.func.isRequired
}

// Exportación del componente
export default Formulario
