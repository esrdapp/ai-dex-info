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
	"0x597e994b9f5a3e397c8c5cfdb3893bacddb8167d":"https://dex.hpbnode.com/download/token-list/logo/asset_STEAM.svg",
	"0xf83811872d457532230a5f1f3cf0ca8f3aa0db55":"https://dex.hpbnode.com/download/token-list/logo/asset_420.svg",
	"0x4ca7665a86fecd3c1df233d8ab72e82261ed838a":"https://dex.hpbnode.com/download/token-list/logo/asset_HBB.svg",
  "0xdfe4051195a09a67defc36ce6bbb5e6edea745cb":"https://dex.hpbnode.com/download/token-list/logo/asset_KING.svg",
  "0xef8432fd5d8b6b33a9915cd6ad22fe9b6718db9b":"https://dex.hpbnode.com/download/token-list/logo/asset_DON.svg",
  "0x8ce49d1feccc1b44fe69a9089c385f43091c1c6b":"https://dex.hpbnode.com/download/token-list/logo/ONE.svg",
  "0xe87fca450807e4180710da738660efef5198c173":"https://dex.hpbnode.com/download/token-list/logo/asset_liadrin.svg",
  "0x88288f66fcfa6eeeb6413672c0722389b461dead":"https://dex.hpbnode.com/download/token-list/logo/asset_leposter.svg",
  "0xd55fe231cb55dda0bb09df0a55b59492ccfa8643":"https://dex.hpbnode.com/download/token-list/logo/asset_asterius.svg",
  "0x9fa2eb3f740055ee6cb1ff11b854f27fbe200e7d":"https://dex.hpbnode.com/download/token-list/logo/asset_torren.svg",
  "0xf72abc6c8a18bdccb13c6ea6a6d0a2d6644d7d33":"https://dex.hpbnode.com/download/token-list/logo/asset_teresa.svg",
  "0x18b52d987e2047d7a9c389a2ce41160dcd24a9cf":"https://dex.hpbnode.com/download/token-list/logo/asset_key.svg",
  "0xe7d30f3ed0604b4399852a7309513ed8f27e3c39":"https://dex.hpbnode.com/download/token-list/logo/asset_gold.svg",
  "0x2885d06706da3d9335ad8e484945d96d153476b4":"https://dex.hpbnode.com/download/token-list/logo/asset_xp.svg",
  "0xcabf7e4c9d28f4957ba6f5558f81ef833fc2914e":"https://dex.hpbnode.com/download/token-list/logo/asset_hdog.svg",
  "0xe516282d58468ef5664cd549849744a4a823af22":"https://dex.hpbnode.com/download/token-list/logo/asset_BTING.svg",
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
