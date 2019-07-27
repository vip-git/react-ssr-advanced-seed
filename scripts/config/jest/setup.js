const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const fetch = require('node-fetch');
// global.Response = Response;
// global.Request = Request;
// global.Headers = Headers;
global.fetch = fetch;

Enzyme.configure({ adapter: new Adapter() });
