import { ChevronDownIcon } from '@chakra-ui/icons'
import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, HStack, Image, Menu, MenuButton, MenuItem, MenuList, Spinner, Text } from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import React from 'react'
import { supportedNetworks } from '../../contexts/Web3Provider'
import { switchToNetwork } from '../../core/connectors'
import { ALL_SUPPORTED_CHAIN_IDS, CHAIN_INFO } from '../../core/connectors/chains'
import { useActiveWeb3React } from '../../core/hooks/web3'

function NetworkSwitch() {
  const { library } = useWeb3React();
  const { chainId, library: activeLibrary } = useActiveWeb3React();
  const isSupportedNetwork = chainId && supportedNetworks.includes(chainId.toString());

  return chainId ? (
    <>
      <Menu>
        <MenuButton w="md" as={Button} border={isSupportedNetwork ? "" : "solid 1px red"} rightIcon={<ChevronDownIcon />}>
          <HStack>
            <Image
              boxSize='2rem'
              borderRadius='full'
              src={CHAIN_INFO[chainId].logoUrl}
              alt={CHAIN_INFO[chainId].label}
              mr='12px'
            />
            <Text size="sm">
              {isSupportedNetwork ? CHAIN_INFO[chainId].label : "Wrong network"}
            </Text>
          </HStack>
        </MenuButton>
        <MenuList>
          {ALL_SUPPORTED_CHAIN_IDS.filter(networkId => (networkId !== chainId && supportedNetworks.includes(networkId.toString()))).map((supportedChainId, i) => {
            return <MenuItem minH='48px' key={supportedChainId.toString()} onClick={() => switchToNetwork({ library: activeLibrary || library, chainId: supportedChainId })
            }>
              <Image
                boxSize='2rem'
                borderRadius='full'
                src={CHAIN_INFO[supportedChainId].logoUrl}
                alt={CHAIN_INFO[supportedChainId].label}
                mr='12px'
              />
              <span>{CHAIN_INFO[supportedChainId].label}</span>
            </MenuItem>
          })}
        </MenuList>
      </Menu >
      {!isSupportedNetwork && (
        <Alert
          status='error'
          variant='solid'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          textAlign='center'
          height='200px'
          w="fit-content"
          position={"fixed"}
          top={"20"}
          right={"20"}
        >
          <AlertIcon boxSize='40px' mr={0} />
          <AlertTitle mt={4} mb={1} fontSize='lg'>
            Unsupported Network
          </AlertTitle>
          <AlertDescription maxWidth='sm'>
            Please switch to a supported network
          </AlertDescription>
        </Alert>
      )}
    </>
  ) : <Spinner />
}

export default NetworkSwitch
