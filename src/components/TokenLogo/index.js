import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { isAddress } from '../../utils/index.js'
import EthereumLogo from '../../assets/hpb.png'

const LOGO_URL = {
  "0xd378634119d2f7b3cf3d60e0b0f5e048e74ce3cf": "https://dex.hpbnode.com/download/token-list/logo/asset_USDT.svg",
  "0x6383f770f1eec68e80ac0c5527be71a11b4d182c": "https://dex.hpbnode.com/download/token-list/logo/asset_hpd.svg",
  "0xe78984541a634c52c760fbf97ca3f8e7d8f04c85": "https://dex.hpbnode.com/download/token-list/logo/asset_old_usdt.svg",
  "0x0f63352df611350201c419de9399a67e50d4b820": "https://dex.hpbnode.com/download/token-list/logo/asset_ETH.svg",
  "0xa7be5e053cb523585a63f8f78b7dbca68647442f": "https://dex.hpbnode.com/download/token-list/logo/asset_esr.svg",
  "0xbe05ac1fb417c9ea435b37a9cecd39bc70359d31": "https://dex.hpbnode.com/download/token-list/logo/asset_whpb.svg",
}

const BAD_IMAGES = {}

const Inline = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
`

const Image = styled.img`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  background-color: white;
  border-radius: 50%;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
`

const StyledEthereumLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  > img {
    width: ${({ size }) => size};
    height: ${({ size }) => size};
  }
`

export default function TokenLogo({ address, header = false, size = '24px', ...rest }) {
  const [error, setError] = useState(false)

  useEffect(() => {
    setError(false)
  }, [address])

  if (error || BAD_IMAGES[address]) {
    return (
      <Inline>
        <span {...rest} alt={''} style={{ fontSize: size }} role="img" aria-label="face">
          🤔
        </span>
      </Inline>
    )
  }

  // hard coded fixes for trust wallet api issues
  if (address?.toLowerCase() === '0x5e74c9036fb86bd7ecdcb084a0673efc32ea31cb') {
    address = '0x42456d7084eacf4083f1140d3229471bba2949a8'
  }

  if (address?.toLowerCase() === '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f') {
    address = '0xc011a72400e58ecd99ee497cf89e3775d4bd732f'
  }

  if (address?.toLowerCase() === '0xbe05ac1fb417c9ea435b37a9cecd39bc70359d31') {
    return (
      <StyledEthereumLogo size={size} {...rest}>
        <img
          src={EthereumLogo}
          style={{
            boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.075)',
            borderRadius: '24px',
          }}
          alt=""
        />
      </StyledEthereumLogo>
    )
  }

  let path = LOGO_URL[address?.toLowerCase()]

  if (!path) {
    return (
      <Inline>
        <span {...rest} alt={''} style={{ fontSize: size }} role="img" aria-label="face">
          🤔
        </span>
      </Inline>
    )
  }

  return (
    <Inline>
      <Image
        {...rest}
        alt={''}
        src={path}
        size={size}
        onError={(event) => {
          BAD_IMAGES[address] = true
          setError(true)
          event.preventDefault()
        }}
      />
    </Inline>
  )
}
