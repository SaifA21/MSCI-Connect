import {render, screen} from '@testing-library/react';
import renderer from 'react-test-renderer';
import Email from './EmailField.js';


import Name from './index.js';


describe('Sign Up Component', () => {

    it('renders correctly', () => {
        const tree = renderer
          .create(<Email></Email>)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });







})