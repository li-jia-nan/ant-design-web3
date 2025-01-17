import { ConnectModal } from '@ant-design/web3';
import { groupOrder, walletList } from './mock';
import { render } from '@testing-library/react';
import { it, describe, expect } from 'vitest';
import { ConfigProvider, theme as antTheme } from 'antd';

describe('ConnectModal without guide', () => {
  it.each(['light', 'dark'] as const)(`should render in %s mode`, async (theme) => {
    const App = () => (
      <ConfigProvider
        theme={{
          algorithm: theme === 'light' ? antTheme.defaultAlgorithm : antTheme.darkAlgorithm,
        }}
      >
        <ConnectModal
          open
          title="ConnectModal"
          footer="Powered by AntChain"
          groupOrder={groupOrder}
          walletList={walletList}
        />
      </ConfigProvider>
    );
    const { baseElement } = render(<App />);
    expect(baseElement).toMatchSnapshot();
    // should have ant-web3-connect-modal class
    expect(baseElement.querySelector('.ant-modal')?.className).toContain('ant-web3-connect-modal');
    // should have simple class when without guide
    expect(baseElement.querySelector('.ant-web3-connect-modal-body')?.className).toContain(
      'simple',
    );

    // should have title and footer
    expect(baseElement.querySelector('.ant-web3-connect-modal-title')?.textContent).toBe(
      'ConnectModal',
    );
    expect(baseElement.querySelector('.ant-web3-connect-modal-footer')?.textContent).toBe(
      'Powered by AntChain',
    );

    // group order
    expect(baseElement.querySelectorAll('.ant-web3-connect-modal-group-title')[0].textContent).toBe(
      'Popular',
    );
    expect(baseElement.querySelectorAll('.ant-web3-connect-modal-group-title')[1].textContent).toBe(
      'More',
    );

    // wallet list items
    expect(baseElement.querySelectorAll('.ant-web3-connect-modal-wallet-item').length).toBe(
      walletList.length,
    );
  });
});
