import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

// Internal
// import ChatComponent from '@omega-web-components/chat-box'; // you need to fina a way to compiler this.
import ChatContainer from '../';

const storeFake = state => {
  return {
    default: jest.fn(),
    subscribe: jest.fn(),
    dispatch: jest.fn(),
    getState: () => state,
  };
};

describe('container <ChatContainer />', () => {
  let wrapper;
  let component;
  let container;

  beforeEach(() => {
    jest.resetAllMocks();

    const store = storeFake({});

    wrapper = mount(
      <Provider store={store}>
        <ChatContainer />
      </Provider>
    );
    container = wrapper.find(ChatContainer);
    // component = container.find(ChatComponent);
  });

  it('should render both the container and the component ', () => {
    expect(container.length).toBeTruthy();
    // expect(component.length).toBeTruthy();
  });

  it('should map state to props', () => {
    const expectedPropKeys = [
      'users',
      'auth',
      'config',
    ];

    expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedPropKeys));
  });

  it('should map dispatch to props', () => {
    const expectedPropKeys = ['load'];

    expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedPropKeys));
  });
});
