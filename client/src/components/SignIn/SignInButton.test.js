import renderer from 'react-test-renderer';

import SignInButton from './SignInButton';


//UNIT TEST BY SAJEEN SELVAKAMALAN
describe('Sign In Button Component', () => {

    it('renders correctly', () => {
        const tree = renderer
          .create(<SignInButton></SignInButton>)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

})