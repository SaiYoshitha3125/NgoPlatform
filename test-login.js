const axios = require('axios');

async function testLogin() {
    try {
        console.log('Attempting login with admin credentials...');
        const res = await axios.post('http://localhost:5000/api/auth/login', {
            email: 'admin@test.com',
            password: 'admin123'
        });
        console.log('Login Successful!');
        console.log('Status:', res.status);
        console.log('Token:', res.data.token ? 'Received' : 'Missing');
        console.log('User Role:', res.data.user.role);
    } catch (err) {
        console.error('Login Failed!');
        if (err.response) {
            console.error('Status:', err.response.status);
            console.error('Data:', err.response.data);
        } else {
            console.error('Error:', err.message);
        }
    }
}

testLogin();
