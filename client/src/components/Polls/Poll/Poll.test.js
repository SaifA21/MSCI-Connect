import renderer from 'react-test-renderer';
import Poll from './Poll.js'


//Unit test written by Sajeen Selvakamalan

describe('Poll Component', () => {

    it('renders correctly', () => {
        const tree = renderer
          .create(<Poll></Poll>)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

})