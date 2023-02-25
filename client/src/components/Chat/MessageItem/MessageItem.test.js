import {render, screen} from '@testing-library/react';
import renderer from 'react-test-renderer';
import MessageItem from './MessageItem';

//UNIT TEST MADE BY THEVEENAN NIRMALAN

describe('Message Component', () => {

    it('renders correctly', () => {
        const tree = renderer
          .create(<MessageItem></MessageItem>)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

})