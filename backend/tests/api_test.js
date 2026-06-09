import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SERVER_PATH = path.join(__dirname, '..', 'server.js');
const TEST_PORT = 5001;

console.log('--- STARTING PORTAL AUTOMATED ENDPOINT TESTING ---');

// Start backend server on test port
const serverProcess = spawn('node', [SERVER_PATH], {
  env: { ...process.env, PORT: TEST_PORT, MONGODB_URI: 'mongodb://localhost:27017/applicant_portal_test' },
  stdio: ['ignore', 'pipe', 'pipe']
});

let serverOutput = '';
serverProcess.stdout.on('data', (data) => {
  serverOutput += data.toString();
  console.log(`[Server]: ${data.toString().trim()}`);
});

serverProcess.stderr.on('data', (data) => {
  console.error(`[Server Error]: ${data.toString().trim()}`);
});

// Helper to wait
const delay = (ms) => new Promise(res => setTimeout(res, ms));

const runTests = async () => {
  // Wait for database connection / fallback log
  await delay(3000);

  const baseUrl = `http://localhost:${TEST_PORT}/api`;
  let applicantToken = '';
  let adminToken = '';
  let applicationNumber = '';
  let ticketId = '';

  try {
    // 1. Register Applicant
    console.log('\n>> Step 1: Registering test applicant...');
    const regRes = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Candidate',
        email: 'test_candidate@portal.com',
        password: 'password123',
        role: 'applicant'
      })
    });
    const regData = await regRes.json();
    if (!regRes.ok) throw new Error(`Registration failed: ${regData.message}`);
    applicantToken = regData.token;
    console.log('   Success! JWT Token received.');

    // 2. Login Applicant
    console.log('\n>> Step 2: Logging in test applicant...');
    const loginRes = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test_candidate@portal.com',
        password: 'password123'
      })
    });
    const loginData = await loginRes.json();
    if (!loginRes.ok) throw new Error(`Login failed: ${loginData.message}`);
    console.log('   Success! Logged in as:', loginData.user.name);

    // 3. Fetch Initial Application Details
    console.log('\n>> Step 3: Fetching default application state...');
    const appRes = await fetch(`${baseUrl}/application`, {
      headers: { 'Authorization': `Bearer ${applicantToken}` }
    });
    const appData = await appRes.json();
    if (!appRes.ok) throw new Error(`Fetch application failed: ${appData.message}`);
    applicationNumber = appData.applicationNumber;
    console.log(`   Success! Application Number: ${applicationNumber}, Status: ${appData.status}`);
    if (appData.status !== 'Draft') throw new Error('Initial status should be Draft');

    // 4. Save Personal Info
    console.log('\n>> Step 4: Saving personal details...');
    const saveRes = await fetch(`${baseUrl}/application/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${applicantToken}`
      },
      body: JSON.stringify({
        programmeCategory: 'Postgraduate',
        programmeStream: 'MCA',
        personalInfo: {
          fullName: 'Test Candidate Updated',
          fatherName: 'Father Name',
          motherName: 'Mother Name',
          gender: 'Male',
          dob: '2000-01-01',
          nationality: 'Indian',
          category: 'General',
          mobile: '9876543210',
          email: 'test_candidate@portal.com',
          currentAddress: 'Current Address Street 1',
          permanentAddress: 'Permanent Address Street 1',
          city: 'Bangalore',
          district: 'Urban',
          state: 'Karnataka',
          pincode: '560001',
          country: 'India'
        }
      })
    });
    const saveData = await saveRes.json();
    if (!saveRes.ok) throw new Error(`Save application failed: ${saveData.message}`);
    console.log('   Success! Personal details saved. Selected Stream:', saveData.programmeStream);

    // 5. Complete Simulated Payment
    console.log('\n>> Step 5: Processing application fee payment...');
    const payRes = await fetch(`${baseUrl}/payments/pay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${applicantToken}`
      },
      body: JSON.stringify({
        applicationNumber,
        paymentMethod: 'UPI',
        amount: 1500
      })
    });
    const payData = await payRes.json();
    if (!payRes.ok) throw new Error(`Payment failed: ${payData.message}`);
    console.log(`   Success! Payment completed. Status: ${payData.paymentStatus}, Transaction ID: ${payData.transactionId}`);

    // 6. Schedule Interview Appointment
    console.log('\n>> Step 6: Booking entrance interview slot...');
    const bookRes = await fetch(`${baseUrl}/appointments/book`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${applicantToken}`
      },
      body: JSON.stringify({
        date: '2026-06-15',
        time: '11:00 AM - 11:30 AM',
        mode: 'Online'
      })
    });
    const bookData = await bookRes.json();
    if (!bookRes.ok) throw new Error(`Booking failed: ${bookData.message}`);
    console.log(`   Success! Interview booked. Status: ${bookData.appointment.status}`);

    // 7. Support Ticket Submission
    console.log('\n>> Step 7: Submitting support ticket...');
    const supportRes = await fetch(`${baseUrl}/support/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${applicantToken}`
      },
      body: JSON.stringify({
        category: 'Document Issue',
        message: 'Could you please confirm standard certificate dimensions?',
        applicationNumber
      })
    });
    const supportData = await supportRes.json();
    if (!supportRes.ok) throw new Error(`Support creation failed: ${supportData.message}`);
    ticketId = supportData.ticket._id || supportData.ticket.id;
    console.log(`   Success! Ticket ID: ${ticketId} created.`);

    // 8. Register Admin Account
    console.log('\n>> Step 8: Registering admin account...');
    const adminRegRes = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Super Admin',
        email: 'admin_test@portal.com',
        password: 'adminpassword',
        role: 'admin'
      })
    });
    const adminRegData = await adminRegRes.json();
    if (!adminRegRes.ok) throw new Error(`Admin registration failed: ${adminRegData.message}`);
    adminToken = adminRegData.token;
    console.log('   Success! Admin session active.');

    // 9. Admin List Applications
    console.log('\n>> Step 9: Querying all applications from support panel...');
    const listRes = await fetch(`${baseUrl}/admin/applications`, {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    const listData = await listRes.json();
    if (!listRes.ok) throw new Error(`Admin fetch failed: ${listData.message}`);
    console.log(`   Success! Total applications registered: ${listData.length}`);
    const foundApp = listData.find(a => a.applicationNumber === applicationNumber);
    if (!foundApp) throw new Error('Registered application not present in admin overview list');

    // 10. Admin Advance Application Progress Status
    console.log('\n>> Step 10: Advancing candidate status manually to Admission Approved...');
    const updateAppRes = await fetch(`${baseUrl}/admin/application/status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      },
      body: JSON.stringify({
        applicationNumber,
        status: 'Admission Approved'
      })
    });
    const updateAppData = await updateAppRes.json();
    if (!updateAppRes.ok) throw new Error(`Admin update application status failed: ${updateAppData.message}`);
    console.log(`    Success! Updated status is: ${updateAppData.application.status}`);

    // All checks passed
    console.log('\n======================================');
    console.log('ALL INTEGRATION TEST ENDPOINTS PASSED SUCCESSFULLY!');
    console.log('======================================');
    cleanExit(0);

  } catch (err) {
    console.error('\nFAIL: Test encountered error:', err.message);
    cleanExit(1);
  }
};

const cleanExit = (code) => {
  serverProcess.kill('SIGINT');
  process.exit(code);
};

// Start testing sequence
runTests();
