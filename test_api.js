// Test script to check if backend API is accessible
const testSubmission = {
    patient_name: "Test Patient",
    contact_email: "test@example.com", 
    contact_phone: "(555) 123-4567",
    reason: "Testing API connectivity",
    current_location: "Home",
    preferred_contact_time: "Morning",
    patient_dob: "1950-01-01"
};

async function testAPI() {
    try {
        console.log('Testing backend API connection...');
        
        const response = await fetch('http://localhost:5000/api/submissions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(testSubmission)
        });
        
        console.log('Response status:', response.status);
        console.log('Response headers:', [...response.headers.entries()]);
        
        if (response.ok) {
            const result = await response.json();
            console.log('✅ API test successful!');
            console.log('Response data:', result);
        } else {
            const errorText = await response.text();
            console.log('❌ API test failed');
            console.log('Error response:', errorText);
        }
        
    } catch (error) {
        console.error('❌ Network error during API test:', error);
        console.log('This indicates the backend may not be accessible from the frontend');
    }
}

// Run the test
testAPI();