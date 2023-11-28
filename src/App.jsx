import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import ImagenCrypto from './img/imagen-criptos.png'
import Formulario from './components/Formulario'
import Resultado from './components/Resultado'
import Spinner from './components/Spinner'

// Estilos para el componente principal
const Root = styled.div`
  margin: 0 auto;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: hsl(208.5, 60.606060606060595%, 12.941176470588237%, 0.8);
`

// Contenedor de cuadrícula para la disposición de los elementos
const GridContainer = styled.div`
  width: 90%;
  max-width: 500px;
  margin: 0 auto;

  @media (min-width: 992px) {
    max-width: 1024px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
    place-items: center;
  }
`

// Contenedor para el formulario
const FormContainer = styled.div`
  width: 100%;
`

// Imagen de criptomonedas
const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  display: block;
`

// Encabezado principal
const Heading = styled.h1`
  font-family: 'lato', sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  font-size: 40px;
  margin-bottom: 3rem;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 10px auto;
  }
`

function App() {
  // Estado para almacenar las monedas seleccionadas en el formulario
  const [currencies, setCurrencies] = useState({})
  // Estado para almacenar la cotización
  const [query, setQuery] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  // Efecto de useEffect para hacer la solicitud de cotización cuando cambian las monedas
  useEffect(() => {
    if (Object.keys(currencies).length > 0) {
      const quoteCrypto = async () => {
        setIsLoading(true)
        const { currency, cryptoCurrency } = currencies

        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoCurrency}&tsyms=${currency}`

        const response = await fetch(url)
        const data = await response.json()
        setQuery(data.DISPLAY[cryptoCurrency][currency])

        // Simulación de retardo para mostrar el spinner
        setTimeout(() => {
          setIsLoading(false)
        }, 500)
      }
      quoteCrypto()
    }
  }, [currencies])

  return (
    <Root>
      <Heading>Cotiza Criptomonedas al instante</Heading>
      <GridContainer>
        {/* Formulario */}
        <FormContainer>
          <Formulario
            currencies={currencies}
            setCurrencies={setCurrencies}
          ></Formulario>
        </FormContainer>
        {/* Condicional para renderizar la imagen, el spinner o el resultado */}
        {Object.keys(query).length === 0 ? (
          <Imagen src={ImagenCrypto} alt='Imagenes criptomonedas' />
        ) : isLoading ? (
          <Spinner />
        ) : (
          <Resultado query={query} />
        )}
      </GridContainer>
    </Root>
  )
}

// Exportación del componente principal
export default App
