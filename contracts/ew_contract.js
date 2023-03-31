export const EW_CONTRACT_ADDRESS = '0x174Da064deb25269D705270b157466588cD60208';
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
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'string',
          name: 'message',
          type: 'string'
        }
      ],
      name: 'RequestCreated',
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
        },
        {
          internalType: 'uint256',
          name: 'quantityEnergy',
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
        },
        {
          internalType: 'uint256',
          name: 'quantityEnergy',
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
      name: 'listRequest',
      outputs: [
        {
          internalType: 'address',
          name: 'sender',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'price',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'quantityEnergy',
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
        },
        {
          internalType: 'uint256',
          name: 'quantityEnergy',
          type: 'uint256'
        }
      ],
      name: 'createEnergyOffer',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'price',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'quantityEnergy',
          type: 'uint256'
        }
      ],
      name: 'createEnergyDemands',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'getEnergyRequest',
      outputs: [
        {
          components: [
            {
              internalType: 'address',
              name: 'sender',
              type: 'address'
            },
            {
              internalType: 'uint256',
              name: 'price',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'quantityEnergy',
              type: 'uint256'
            }
          ],
          internalType: 'struct MicroGridContract.EnergyRequest[]',
          name: 'list',
          type: 'tuple[]'
        }
      ],
      stateMutability: 'view',
      type: 'function',
      constant: true
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
            },
            {
              internalType: 'uint256',
              name: 'quantityEnergy',
              type: 'uint256'
            }
          ],
          internalType: 'struct MicroGridContract.EnergyOffer[]',
          name: '',
          type: 'tuple[]'
        }
      ],
      stateMutability: 'view',
      type: 'function',
      constant: true
    }
  ]
};
