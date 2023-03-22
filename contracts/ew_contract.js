export const EW_CONTRACT_ADDRESS = '0xC8b1503b4433ab407a463467e7aa7E4a832464Fd';
export const EW_CONTRACT_ABI = {
  abi: [
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'string',
          name: 'message',
          type: 'string'
        }
      ],
      name: 'OfferCreated',
      type: 'event'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        }
      ],
      name: 'eWOffersList',
      outputs: [
        {
          internalType: 'address',
          name: 'asset',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'price',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'startDate',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'endDate',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function',
      constant: true
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      name: 'listOffers',
      outputs: [
        {
          internalType: 'address',
          name: 'asset',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'price',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'startDate',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'endDate',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function',
      constant: true
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'asset',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'price',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'startDate',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'endDate',
          type: 'uint256'
        }
      ],
      name: 'createEnergyOffer',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'getOffers',
      outputs: [
        {
          components: [
            {
              internalType: 'address',
              name: 'asset',
              type: 'address'
            },
            {
              internalType: 'uint256',
              name: 'price',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'startDate',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'endDate',
              type: 'uint256'
            }
          ],
          internalType: 'struct MicroGridContract.EnergyOffer[]',
          name: 'list',
          type: 'tuple[]'
        }
      ],
      stateMutability: 'view',
      type: 'function',
      constant: true
    }
  ]
};
