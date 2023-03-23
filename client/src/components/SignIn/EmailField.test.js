import renderer from 'react-test-renderer';
import Email from './EmailField.js';



// Unit Test: Saif Abuosba 
describe('Sign In Component', () => {

    it('renders correctly', () => {
        const tree = renderer
          .create(<Email></Email>)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

})