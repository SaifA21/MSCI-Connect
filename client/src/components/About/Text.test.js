import {render, screen} from '@testing-library/react';
import renderer from 'react-test-renderer';
import Text from './Text.js'


//UNIT TEST BY SAJEEN SELVAKAMALAN
describe('Text Component', () => {

    it('renders correctly', () => {
        const tree = renderer
          .create(<Text></Text>)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

})