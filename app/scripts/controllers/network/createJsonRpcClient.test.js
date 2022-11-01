/**
 * @jest-environment node
 */
import {
  withMockedCommunications,
  withClient,
} from './provider-api-tests/helpers';
import {
  testsForRpcMethodNotHandledByMiddleware,
  testsForRpcMethodAssumingNoBlockParam,
  testsForRpcMethodsThatCheckForBlockHashInResponse,
  testsForRpcMethodSupportingBlockParam,
} from './provider-api-tests/shared-tests';

describe('createJsonRpClient', () => {
  // Ethereum JSON-RPC spec: <https://ethereum.github.io/execution-apis/api-documentation/>

  describe('RPC methods supported by CustomRpc and listed in the JSON-RPC spec', () => {
    describe('eth_accounts', () => {
      testsForRpcMethodNotHandledByMiddleware('eth_accounts', {
        numberOfParameters: 0,
        providerType: 'custom',
      });
    });

    describe('eth_blockNumber', () => {
      testsForRpcMethodAssumingNoBlockParam('eth_blockNumber', {
        providerType: 'custom',
      });
    });

    describe('eth_call', () => {
      testsForRpcMethodSupportingBlockParam('eth_call', {
        blockParamIndex: 1,
        providerType: 'custom',
      });
    });

    describe('eth_chainId', () => {
      it('does not hit Infura, instead returning the chain id that maps to the Infura network, as a hex string', async () => {
        const chainId = await withClient(
          { network: 'goerli', providerType: 'custom' },
          ({ makeRpcCall }) => {
            return makeRpcCall({
              method: 'eth_chainId',
            });
          },
        );

        expect(chainId).toStrictEqual('0x5');
      });
    });

    describe('eth_coinbase', () => {
      testsForRpcMethodNotHandledByMiddleware('eth_coinbase', {
        numberOfParameters: 0,
        providerType: 'custom',
      });
    });

    describe('eth_estimateGas', () => {
      testsForRpcMethodAssumingNoBlockParam('eth_estimateGas', {
        providerType: 'custom',
      });
    });

    describe('eth_feeHistory', () => {
      testsForRpcMethodNotHandledByMiddleware('eth_feeHistory', {
        numberOfParameters: 3,
        providerType: 'custom',
      });
    });

    describe('eth_getBalance', () => {
      testsForRpcMethodSupportingBlockParam('eth_getBalance', {
        blockParamIndex: 1,
        providerType: 'custom',
      });
    });

    describe('eth_gasPrice', () => {
      testsForRpcMethodAssumingNoBlockParam('eth_gasPrice', {
        providerType: 'custom',
      });
    });

    describe('eth_getBlockByHash', () => {
      testsForRpcMethodAssumingNoBlockParam('eth_getBlockByHash', {
        providerType: 'custom',
      });
    });

    describe('eth_getBlockByNumber', () => {
      testsForRpcMethodSupportingBlockParam('eth_getBlockByNumber', {
        blockParamIndex: 0,
        providerType: 'custom',
      });
    });

    describe('eth_getBlockTransactionCountByHash', () => {
      testsForRpcMethodAssumingNoBlockParam(
        'eth_getBlockTransactionCountByHash',
        {
          providerType: 'custom',
        },
      );
    });

    describe('eth_getBlockTransactionCountByNumber', () => {
      // NOTE: eth_getBlockTransactionCountByNumber does take a block param at
      // the 0th index, but this is not handled by our cache middleware
      // currently
      testsForRpcMethodAssumingNoBlockParam(
        'eth_getBlockTransactionCountByNumber',
        {
          providerType: 'custom',
        },
      );
    });

    describe('eth_getCode', () => {
      testsForRpcMethodSupportingBlockParam('eth_getCode', {
        blockParamIndex: 1,

        providerType: 'custom',
      });
    });

    describe('eth_getFilterChanges', () => {
      testsForRpcMethodNotHandledByMiddleware('eth_getFilterChanges', {
        numberOfParameters: 1,
        providerType: 'custom',
      });
    });

    describe('eth_getFilterLogs', () => {
      testsForRpcMethodAssumingNoBlockParam('eth_getFilterLogs', {
        providerType: 'custom',
      });
    });

    describe('eth_getLogs', () => {
      testsForRpcMethodNotHandledByMiddleware('eth_getLogs', {
        numberOfParameters: 1,
        providerType: 'custom',
      });
    });

    describe('eth_getStorageAt', () => {
      testsForRpcMethodSupportingBlockParam('eth_getStorageAt', {
        blockParamIndex: 2,
        providerType: 'custom',
      });
    });

    describe('eth_getTransactionByBlockHashAndIndex', () => {
      testsForRpcMethodAssumingNoBlockParam(
        'eth_getTransactionByBlockHashAndIndex',
        {
          providerType: 'custom',
        },
      );
    });

    describe('eth_getTransactionByBlockNumberAndIndex', () => {
      // NOTE: eth_getTransactionByBlockNumberAndIndex does take a block param
      // at the 0th index, but this is not handled by our cache middleware
      // currently
      testsForRpcMethodAssumingNoBlockParam(
        'eth_getTransactionByBlockNumberAndIndex',
        {
          providerType: 'custom',
        },
      );
    });

    describe('eth_getTransactionByHash', () => {
      const method = 'eth_getTransactionByHash';

      testsForRpcMethodsThatCheckForBlockHashInResponse(method);

      it("refreshes the block tracker's current block if it is less than the block number that comes back in the response", async () => {
        await withMockedCommunications(
          { providerType: 'custom' },
          async (comms) => {
            const request = { method };

            // The first time a block-cacheable request is made, the latest
            // block number is retrieved through the block tracker first.
            comms.mockNextBlockTrackerRequest({ blockNumber: '0x100' });
            // This is our request.
            comms.mockRpcCall({
              request,
              response: {
                result: {
                  blockNumber: '0x200',
                },
              },
            });
            // The block-tracker-inspector middleware will request the latest
            // block through the block tracker again.
            comms.mockNextBlockTrackerRequest({ blockNumber: '0x300' });

            await withClient(
              { providerType: 'custom' },
              async ({ makeRpcCall, blockTracker }) => {
                await makeRpcCall(request);
                expect(blockTracker.getCurrentBlock()).toStrictEqual('0x300');
              },
            );
          },
        );
      });
    });

    describe('eth_getTransactionCount', () => {
      testsForRpcMethodSupportingBlockParam('eth_getTransactionCount', {
        blockParamIndex: 1,
        providerType: 'custom',
      });
    });

    describe('eth_getTransactionReceipt', () => {
      const method = 'eth_getTransactionReceipt';

      testsForRpcMethodsThatCheckForBlockHashInResponse(method);

      it("refreshes the block tracker's current block if it is less than the block number that comes back in the response", async () => {
        await withMockedCommunications(
          { providerType: 'custom' },
          async (comms) => {
            const request = { method };

            // The first time a block-cacheable request is made, the latest
            // block number is retrieved through the block tracker first.
            comms.mockNextBlockTrackerRequest({ blockNumber: '0x100' });
            // This is our request.
            comms.mockRpcCall({
              request,
              response: {
                result: {
                  blockNumber: '0x200',
                },
              },
            });
            // The block-tracker-inspector middleware will request the latest
            // block through the block tracker again.
            comms.mockNextBlockTrackerRequest({ blockNumber: '0x300' });

            await withClient(
              { providerType: 'custom' },
              async ({ makeRpcCall, blockTracker }) => {
                await makeRpcCall(request);
                expect(blockTracker.getCurrentBlock()).toStrictEqual('0x300');
              },
            );
          },
        );
      });
    });

    describe('eth_getUncleByBlockHashAndIndex', () => {
      testsForRpcMethodAssumingNoBlockParam('eth_getUncleByBlockHashAndIndex', {
        providerType: 'custom',
      });
    });

    describe('eth_getUncleByBlockNumberAndIndex', () => {
      // NOTE: eth_getUncleByBlockNumberAndIndex does take a block param at the
      // 0th index, but this is not handled by our cache middleware currently
      testsForRpcMethodAssumingNoBlockParam(
        'eth_getUncleByBlockNumberAndIndex',
        {
          providerType: 'custom',
        },
      );
    });

    describe('eth_getUncleCountByBlockHash', () => {
      testsForRpcMethodAssumingNoBlockParam('eth_getUncleCountByBlockHash', {
        providerType: 'custom',
      });
    });

    describe('eth_getUncleCountByBlockNumber', () => {
      // NOTE: eth_getUncleCountByBlockNumber does take a block param at the 0th
      // index, but this is not handled by our cache middleware currently
      testsForRpcMethodAssumingNoBlockParam('eth_getUncleCountByBlockNumber', {
        providerType: 'custom',
      });
    });

    describe('eth_getWork', () => {
      testsForRpcMethodNotHandledByMiddleware('eth_getWork', {
        numberOfParameters: 0,
        providerType: 'custom',
      });
    });

    describe('eth_hashrate', () => {
      testsForRpcMethodNotHandledByMiddleware('eth_hashrate', {
        numberOfParameters: 0,
        providerType: 'custom',
      });
    });

    describe('eth_mining', () => {
      testsForRpcMethodNotHandledByMiddleware('eth_mining', {
        numberOfParameters: 0,
        providerType: 'custom',
      });
    });

    describe('eth_newBlockFilter', () => {
      testsForRpcMethodNotHandledByMiddleware('eth_newBlockFilter', {
        numberOfParameters: 0,
        providerType: 'custom',
      });
    });

    describe('eth_newFilter', () => {
      testsForRpcMethodNotHandledByMiddleware('eth_newFilter', {
        numberOfParameters: 1,
        providerType: 'custom',
      });
    });

    describe('eth_newPendingTransactionFilter', () => {
      testsForRpcMethodNotHandledByMiddleware(
        'eth_newPendingTransactionFilter',
        { numberOfParameters: 0, providerType: 'custom' },
      );
    });

    describe('eth_protocolVersion', () => {
      testsForRpcMethodAssumingNoBlockParam('eth_protocolVersion', {
        providerType: 'custom',
      });
    });

    describe('eth_sendRawTransaction', () => {
      testsForRpcMethodNotHandledByMiddleware('eth_sendRawTransaction', {
        numberOfParameters: 1,
        providerType: 'custom',
      });
    });

    describe('eth_sendTransaction', () => {
      testsForRpcMethodNotHandledByMiddleware('eth_sendTransaction', {
        numberOfParameters: 1,
        providerType: 'custom',
      });
    });

    describe('eth_sign', () => {
      testsForRpcMethodNotHandledByMiddleware('eth_sign', {
        numberOfParameters: 2,
        providerType: 'custom',
      });
    });

    describe('eth_submitWork', () => {
      testsForRpcMethodNotHandledByMiddleware('eth_submitWork', {
        numberOfParameters: 3,
        providerType: 'custom',
      });
    });

    describe('eth_syncing', () => {
      testsForRpcMethodNotHandledByMiddleware('eth_syncing', {
        numberOfParameters: 0,
        providerType: 'custom',
      });
    });

    describe('eth_uninstallFilter', () => {
      testsForRpcMethodNotHandledByMiddleware('eth_uninstallFilter', {
        numberOfParameters: 1,
        providerType: 'custom',
      });
    });
  });

  describe('RPC methods supported by Infura but not listed in the JSON-RPC spec', () => {
    describe('eth_subscribe', () => {
      testsForRpcMethodNotHandledByMiddleware('eth_subscribe', {
        numberOfParameters: 1,
        providerType: 'custom',
      });
    });

    describe('eth_unsubscribe', () => {
      testsForRpcMethodNotHandledByMiddleware('eth_unsubscribe', {
        numberOfParameters: 1,
        providerType: 'custom',
      });
    });

    describe('net_listening', () => {
      testsForRpcMethodNotHandledByMiddleware('net_listening', {
        numberOfParameters: 0,
        providerType: 'custom',
      });
    });

    describe('net_peerCount', () => {
      testsForRpcMethodNotHandledByMiddleware('net_peerCount', {
        numberOfParameters: 0,
        providerType: 'custom',
      });
    });

    describe('net_version', () => {
      it('does not hit Infura, instead returning the chain id that maps to the Infura network, as a decimal string', async () => {
        const chainId = await withClient(
          {
            network: 'goerli',
            providerType: 'custom',
          },
          ({ makeRpcCall }) => {
            return makeRpcCall({
              method: 'net_version',
            });
          },
        );

        expect(chainId).toStrictEqual('5');
      });
    });

    describe('parity_nextNonce', () => {
      testsForRpcMethodNotHandledByMiddleware('parity_nextNonce', {
        numberOfParameters: 1,
        providerType: 'custom',
      });
    });

    describe('web3_clientVersion', () => {
      testsForRpcMethodAssumingNoBlockParam('web3_clientVersion', {
        providerType: 'custom',
      });
    });
  });

  // NOTE: The following methods are omitted because although they are listed in
  // the Ethereum spec, they do not seem to be supported by Infura:
  //
  // - debug_getBadBlocks
  // - debug_getRawBlock
  // - debug_getRawHeader
  // - debug_getRawReceipts
  // - eth_createAccessList
  // - eth_compileLLL
  // - eth_compileSerpent
  // - eth_compileSolidity
  // - eth_getCompilers
  // - eth_getProof
  // - eth_maxPriorityFeePerGas
  // - eth_submitHashrate
  // - web3_sha3

  testsForRpcMethodNotHandledByMiddleware('custom_rpc_method', {
    numberOfParameters: 1,
    providerType: 'custom',
  });
});
