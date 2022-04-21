import { Flex, Container } from '@chakra-ui/react'
import BlurBG from './blurBG'
import Header from './header'
import Footer from './footer'
import { useRouter } from 'next/router'
import { FC } from 'react'

const DaoLayout: FC = ({ children }) => {
  const location = useRouter()
  return (
    <Flex flexDir="column" height={location.pathname === '/' ? '100%' : 'auto'}>
      <BlurBG />
      <Header />

      <Container
        maxW={'container.xl'}
        zIndex={2}
        marginTop={{ base: '80px', md: '120px' }}
      >
        {children}
      </Container>

      <Footer
        position={location.pathname === '/' ? 'absolute' : 'static'}
        bottom={0}
        left={0}
        right={0}
      />
    </Flex>
  )
}

export default DaoLayout
