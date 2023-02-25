import renderer from 'react-test-renderer';
import Filter from './Filter.js';



//Unit test written by Suhayl Sayed

describe('Filter Component', () => {

    it('renders correctly', () => {
        const tree = renderer
          .create(<Filter></Filter>)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

})