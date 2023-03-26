import renderer from 'react-test-renderer';
import SubmitButton from './SubmitButton';


// Unit Test: Theveenan Nirmalan
describe('submit button', () => {

    it('renders correctly', () => {
        const tree = renderer
          .create(<SubmitButton></SubmitButton>)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });


})