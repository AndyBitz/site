import ronin from 'ronin';
import * as models from '../../schema';

const { get, set, add, remove, count } = ronin({ models });

export { get, set, add, remove, count };