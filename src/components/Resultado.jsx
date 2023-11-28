import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const Container = styled.div`
  font-family: 'Lato', sans-serif;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: flex-end;
  background-color: hsl(238.3177570093458, 100%, 79.01960784313727%, 0.6);
  color: hsl(208.5, 60.606060606060595%, 12.941176470588237%);
  border-radius: 5px;
  font-weight: 600;

  @media (max-width: 991px) {
    margin: 3rem auto;
  }
`
const Text = styled.p`
  font-size: 16px;
  span {
    font-weight: 700;
  }
`
const Price = styled.p`
  font-size: 24px;
  span {
    font-weight: 700;
  }
`

const Image = styled.img`
  display: block;
  width: 120px;
  object-fit: cover;
`

const Resultado = ({ query }) => {
  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } =
    query

  return (
    <Container>
      <Image src={`https://cryptocompare.com/${IMAGEURL}`} alt='Crypto Image' />
      <div>
        <Price>
          El precio es de: <span>{PRICE}</span>
        </Price>

        <Text>
          Precio más alto del día: <span>{HIGHDAY}</span>
        </Text>
        <Text>
          Precio más bajo del día: <span>{LOWDAY}</span>
        </Text>
        <Text>
          Variación de las últimas 24h: <span>{CHANGEPCT24HOUR}</span>
        </Text>
        <Text>
          última actualizacion: <span>{LASTUPDATE}</span>
        </Text>
      </div>
    </Container>
  )
}

Resultado.propTypes = {
  query: PropTypes.object.isRequired
}

export default Resultado
