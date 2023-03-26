import renderer from 'react-test-renderer';
import EmailField from './EmailField';


// Unit Test: Theveenan Nirmalan
describe('email text field', () => {

    it('renders correctly', () => {
        const tree = renderer
          .create(<EmailField></EmailField>)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });


})