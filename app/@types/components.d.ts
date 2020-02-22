/**
 * Operation interface
 * Useful for creating different views
 * @author Sourodeep Chatterjee <sourodeep224@outlook.com>
 */
interface IOperation {
  /**
   * Title of the new View
   */
  title: string;
  /**
   * Link of the new view
   */
  href: string;
  /**
   * Icon to render in the Sidebar for the specific view
   */
  icon: React.ReactElement;
}

/**
 * Reducer Interface
 * Useful for getting a normal reducer props
 *
 * @author Sourodeep Chatterjee <sourodeep224@outlook.com>
 */
interface IReducer {
  /**
   * For getting whether the reducer is in load state
   */
  loading: boolean;
  /**
   * For finding the success state
   */
  success: object;
  /**
   * Catch any kind of errors
   */
  error: object;
}

// TODO DESCRIPTION
type CircularProgressVariant = 'determinate' | 'indeterminate' | 'static';

type LinearProgressVariant =
  | 'determinate'
  | 'indeterminate'
  | 'buffer'
  | 'query';
