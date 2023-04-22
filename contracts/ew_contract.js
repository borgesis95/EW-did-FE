export const EW_CONTRACT_ADDRESS = '0x36d6118d7943E4a66eB29D51558F8003b5DeEf2c';
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
      name: 'BidCreated',
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
      name: 'OfferCreated',
      type: 'event'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      name: 'bids',
      outputs: [
        {
          internalType: 'address',
          name: 'user',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'maxPrice',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'creationDate',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function',
      constant: true
    },
    {
      inputs: [],
      name: 'matchTest',
      outputs: [
        {
          internalType: 'address',
          name: 'from',
          type: 'address'
        },
        {
          internalType: 'address',
          name: 'to',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'price',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'quantity',
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
      name: 'matching',
      outputs: [
        {
          internalType: 'address',
          name: 'from',
          type: 'address'
        },
        {
          internalType: 'address',
          name: 'to',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'price',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'quantity',
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
      name: 'misuration',
      outputs: [
        {
          internalType: 'address',
          name: 'user',
          type: 'address'
        },
        {
          internalType: 'uint128',
          name: 'generated',
          type: 'uint128'
        },
        {
          internalType: 'uint128',
          name: 'consumed',
          type: 'uint128'
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
      name: 'offers',
      outputs: [
        {
          internalType: 'address',
          name: 'user',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'minPrice',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'creationDate',
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
          name: '',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      name: 'userBids',
      outputs: [
        {
          internalType: 'address',
          name: 'user',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'maxPrice',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'creationDate',
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
          name: '',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      name: 'userOffers',
      outputs: [
        {
          internalType: 'address',
          name: 'user',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'minPrice',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'creationDate',
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
          name: '_address',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: '_maxPrice',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: '_creationDate',
          type: 'uint256'
        }
      ],
      name: 'createOffer',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'deleteAllOffers',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '_address',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: '_minPrice',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: '_creationDate',
          type: 'uint256'
        }
      ],
      name: 'createBid',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '_address',
          type: 'address'
        },
        {
          internalType: 'uint128',
          name: '_produced',
          type: 'uint128'
        },
        {
          internalType: 'uint128',
          name: '_consumed',
          type: 'uint128'
        }
      ],
      name: 'addMisuration',
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
              name: 'user',
              type: 'address'
            },
            {
              internalType: 'uint256',
              name: 'minPrice',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'creationDate',
              type: 'uint256'
            }
          ],
          internalType: 'struct MarketMicroGridContract.Offer[]',
          name: '',
          type: 'tuple[]'
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
          name: '_address',
          type: 'address'
        }
      ],
      name: 'getOffersByAddress',
      outputs: [
        {
          components: [
            {
              internalType: 'address',
              name: 'user',
              type: 'address'
            },
            {
              internalType: 'uint256',
              name: 'minPrice',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'creationDate',
              type: 'uint256'
            }
          ],
          internalType: 'struct MarketMicroGridContract.Offer[]',
          name: '',
          type: 'tuple[]'
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
          name: '_address',
          type: 'address'
        }
      ],
      name: 'getBidsByAddress',
      outputs: [
        {
          components: [
            {
              internalType: 'address',
              name: 'user',
              type: 'address'
            },
            {
              internalType: 'uint256',
              name: 'maxPrice',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'creationDate',
              type: 'uint256'
            }
          ],
          internalType: 'struct MarketMicroGridContract.Bid[]',
          name: '',
          type: 'tuple[]'
        }
      ],
      stateMutability: 'view',
      type: 'function',
      constant: true
    },
    {
      inputs: [],
      name: 'getBids',
      outputs: [
        {
          components: [
            {
              internalType: 'address',
              name: 'user',
              type: 'address'
            },
            {
              internalType: 'uint256',
              name: 'maxPrice',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'creationDate',
              type: 'uint256'
            }
          ],
          internalType: 'struct MarketMicroGridContract.Bid[]',
          name: '',
          type: 'tuple[]'
        }
      ],
      stateMutability: 'view',
      type: 'function',
      constant: true
    },
    {
      inputs: [
        {
          components: [
            {
              internalType: 'address',
              name: 'from',
              type: 'address'
            },
            {
              internalType: 'address',
              name: 'to',
              type: 'address'
            },
            {
              internalType: 'uint256',
              name: 'price',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'quantity',
              type: 'uint256'
            }
          ],
          internalType: 'struct MarketMicroGridContract.Matching[]',
          name: '_matchingList',
          type: 'tuple[]'
        }
      ],
      name: 'createMatch',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'getMatch',
      outputs: [
        {
          components: [
            {
              internalType: 'address',
              name: 'from',
              type: 'address'
            },
            {
              internalType: 'address',
              name: 'to',
              type: 'address'
            },
            {
              internalType: 'uint256',
              name: 'price',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'quantity',
              type: 'uint256'
            }
          ],
          internalType: 'struct MarketMicroGridContract.Matching[]',
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
