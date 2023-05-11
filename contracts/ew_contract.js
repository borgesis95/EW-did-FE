export const EW_CONTRACT_ADDRESS = '0xeFfa502E18A0Cfe90EE247c5FbF65D8A678c0fa4';
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
          internalType: 'address',
          name: 'sender',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'message',
          type: 'string'
        }
      ],
      name: 'MoneyReceived',
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
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'sender',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'value',
          type: 'uint256'
        }
      ],
      name: 'TransferReceived',
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
          name: '',
          type: 'address'
        }
      ],
      name: 'userPayment',
      outputs: [
        {
          internalType: 'int256',
          name: '',
          type: 'int256'
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
          internalType: 'address',
          name: '_address',
          type: 'address'
        },
        {
          internalType: 'int256',
          name: '_price',
          type: 'int256'
        }
      ],
      name: 'createPaymentTransaction',
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
        }
      ],
      name: 'resetPayment',
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
        }
      ],
      name: 'getPaymentTransaction',
      outputs: [
        {
          internalType: 'int256',
          name: '',
          type: 'int256'
        }
      ],
      stateMutability: 'view',
      type: 'function',
      constant: true
    },
    {
      inputs: [
        {
          internalType: 'int256',
          name: 'price',
          type: 'int256'
        }
      ],
      name: 'pay',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
      payable: true
    },
    {
      inputs: [
        {
          internalType: 'address payable',
          name: '_address',
          type: 'address'
        },
        {
          internalType: 'int256',
          name: '_price',
          type: 'int256'
        },
        {
          internalType: 'uint256',
          name: '_wei',
          type: 'uint256'
        }
      ],
      name: 'withDrawMoney',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'getContractBalance',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function',
      constant: true
    }
  ]
};
