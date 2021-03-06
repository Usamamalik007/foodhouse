const SERVER_URL = 'http://ec2-44-201-171-84.compute-1.amazonaws.com:4005';

const CUSTOMER_API_NAME = '/customerapi/';
const USER_API_NAME = '/userapi/';
const ADMIN_API_NAME = '/adminapi/';

const SERVER_URL_CUSTOMER = SERVER_URL + ':3003' + CUSTOMER_API_NAME;
const SERVER_URL_USER = SERVER_URL + ':3000' + USER_API_NAME;
const SERVER_URL_ADMIN = SERVER_URL + ':3002' + ADMIN_API_NAME;

export {SERVER_URL_CUSTOMER, SERVER_URL_USER, SERVER_URL_ADMIN};
