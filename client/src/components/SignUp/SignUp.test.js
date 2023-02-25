import renderer from 'react-test-renderer';
import Email from './EmailField.js';
import Password from './PasswordField.js';


// Unit Test: Saif Abuosba 
describe('Sign Up Component', () => {

    it('renders correctly', () => {
        const tree = renderer
          .create(<Email></Email>)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });


    it('renders correctly', () => {
        const tree = renderer
          .create(<Password></Password>)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });



})