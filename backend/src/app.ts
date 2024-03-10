// Enable JSON.stringify to be used on objects with BigInt types.
BigInt.prototype['toJSON'] = function () {
  return this.toString();
};

import * as dotenv from 'dotenv';

dotenv.config();

import restify from 'restify';
import routes from './routes';

const app = restify.createServer({});
const PORT: string | number = process.env.PORT || 3000;

app.listen(
  PORT,
  process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost',
  () => {
    console.log('SERVER IS UP ON PORT:', PORT);

    routes(app);
  }
);
