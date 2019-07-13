import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

// Internal
import ChatComponent from '@omega-web-components/chat-box';
import ChatContainer from '@omega-web-containers/chat';

// Redux Model
import { ChatReduxModel } from '@omega-state-machines/chat/chat.redux-model';

interface IState {
  chats: {
    currentUsers: {
      id: string;
      name: string;
      status: string;
      avatar: string;
    };
    currentChat: {
      text: string;
      type: string;
      date: string;
    };
    defaultChats: any[];
    defaultUsers: any[];
  };
}

const storeFake = (state: IState) => {
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

    const store = storeFake({
      chats: ChatReduxModel.attributes,
    });

    wrapper = mount(
      <Provider store={store}>
        <ChatContainer />
      </Provider>,
    );
    container = wrapper.find(ChatContainer);
    component = container.find(ChatComponent);
  });

  it('should render both the container and the component ', () => {
    expect(container.length).toBeTruthy();
    expect(component.length).toBeTruthy();
  });

  it('should map state to props', () => {
    const expectedPropKeys = [
      'sharedComponent',
      'title',
      'defaultChats',
      'defaultUsers',
    ];

    expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedPropKeys));
  });

  it('should map dispatch to props', () => {
    const expectedPropKeys = [
      'sharedComponent',
      'title',
      'defaultChats',
      'defaultUsers',
    ];

    expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedPropKeys));
  });
});
