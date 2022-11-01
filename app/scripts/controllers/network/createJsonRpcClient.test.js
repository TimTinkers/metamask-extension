/**
 * @jest-environment node
 */
import {
  testsForRpcMethodNotHandledByMiddleware,
  testsForRpcMethodAssumingNoBlockParam
} from './provider-api-tests/shared-tests';

describe('createJsonRpClient', () => {
  // Ethereum JSON-RPC spec: <https://ethereum.github.io/execution-apis/api-documentation/>

  describe('RPC methods supported by CustomRpc and listed in the JSON-RPC spec', () => {
    describe('eth_accounts', () => {
      testsForRpcMethodNotHandledByMiddleware('eth_accounts', {
        numberOfParameters: 0,
        providerType: 'custom'
      });
    });

    describe('eth_blockNumber', () => {
      testsForRpcMethodAssumingNoBlockParam('eth_blockNumber', {
        providerType: 'custom'
      });
    });
  });
});
