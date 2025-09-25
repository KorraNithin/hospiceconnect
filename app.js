// // 1. Add this constant near the top (after any comments, before the class)
// const API_BASE = 'http://localhost:3000/api';



// // Add handler for Local Healthcare Professional Login button
// document.addEventListener('DOMContentLoaded', () => {
//     const loginBtn = document.getElementById('hcp-login-btn');
//     if (loginBtn) {
//         // Make sure we remove any existing event listeners first by cloning the element
//         const newLoginBtn = loginBtn.cloneNode(true);
//         loginBtn.parentNode.replaceChild(newLoginBtn, loginBtn);
        
//         // Add our clean event listener to the new element
//         newLoginBtn.addEventListener('click', () => {
//             console.log('Opening healthcare professional dashboard in new tab');
//             // Open the frontend1 login/dashboard in a new tab
//             window.open('http://localhost:5502', '_blank');
//         });
//     }
// });
// // Family Hospice Support Network Application
// class FamilyHospiceGuidance {
//     constructor() {
//         this.currentStep = 1;
//         this.formData = {};
//         this.nextStepsTemplates = {
//             immediate: {
//                 title: "Immediate Support Response",
//                 timeframe: "A licensed specialist will call within 2 hours to provide immediate support",
//                 steps: [
//                     "Crisis assessment and immediate comfort measures",
//                     "Direct connection to available hospice agencies",
//                     "Medicare coverage verification",
//                     "24/7 support line access for your family"
//                 ]
//             },
//             week: {
//                 title: "This Week Support Plan",
//                 timeframe: "A healthcare professional will call within 24 hours to discuss your options",
//                 steps: [
//                     "Comprehensive situation assessment",
//                     "Educational resources about hospice care",
//                     "Introduction to 2-3 matched agencies",
//                     "Follow-up consultation scheduling"
//                 ]
//             },
//             month: {
//                 title: "Monthly Planning Support",
//                 timeframe: "A specialist will call within 48 hours to provide guidance and resources",
//                 steps: [
//                     "Detailed planning consultation",
//                     "Medicare and insurance guidance",
//                     "Family preparation resources",
//                     "Ongoing support coordination"
//                 ]
//             },
//             future: {
//                 title: "Future Planning Resources",
//                 timeframe: "You'll receive educational materials by email and a call within 7 days",
//                 steps: [
//                     "Comprehensive planning guide delivery",
//                     "Educational webinar access",
//                     "Future consultation scheduling",
//                     "Resource library access"
//                 ]
//             }
//         };
        
//         this.init();
//     }

//     init() {
//         this.setupFormHandlers();
//         this.setupModalHandlers();
//         this.setupValidation();
//         this.setupProgressTracking();
//         this.setupStepNavigation();
//     }

//     setupFormHandlers() {
//         // Handle all form submissions
//         for (let i = 1; i <= 4; i++) {
//             const form = document.getElementById(`step-${i}-form`);
//             if (form) {
//                 form.addEventListener('submit', (e) => {
//                     e.preventDefault();
//                     this.handleFormSubmit(i);
//                 });
//             }
//         }

//         // Setup phone number formatting
//         const phoneInput = document.getElementById('phone');
//         if (phoneInput) {
//             phoneInput.addEventListener('input', this.formatPhoneNumber.bind(this));
//         }
//     }

// // ...existing code...
//     async handleFormSubmit(step) {
//         const form = document.getElementById(`step-${step}-form`);

//         // Validate form first
//         if (!this.validateForm(form)) {
//             console.log('Form validation failed for step', step);
//             return;
//         }

//         // Collect form data
//         this.collectFormData(form);

//         // Show loading state
//         this.showLoadingState(step);

//         // Simulate processing time with realistic delay
//         const delay = step === 1 ? 800 : (step === 4 ? 1500 : 1000);

//         if (step === 4) {
//             // On final step, send data to backend
//             try {
//                 await new Promise(resolve => setTimeout(resolve, delay)); // keep the delay for UX
                
//                 // Add timestamp and format data
//                 const submissionData = {
//                     ...this.formData,
//                     submitted_at: new Date().toISOString(),
//                     submission_type: 'public',
//                     source: 'public_website_form'
//                 };

//                 const response = await fetch(`${API_BASE}/submissions`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Accept': 'application/json'
//                     },
//                     body: JSON.stringify(submissionData)
//                 });

//                 this.hideLoadingState(step);

//                 if (response.ok) {
//                     const result = await response.json();
                    
//                     // Store submission ID for reference
//                     this.submissionId = result.submissionId;
                    
//                     // Track successful submission
//                     this.trackConversion();
                    
//                     // Show success modal with next steps
//                     this.showSuccessModal();

//                     // If urgent, trigger emergency support
//                     if (this.formData.urgency_level === 'immediate') {
//                         this.triggerEmergencySupport();
//                     }
//                 } else {
//                     const errorData = await response.json();
//                     console.error('Submission error:', errorData);
                    
//                     // Show user-friendly error message
//                     const errorDiv = document.createElement('div');
//                     errorDiv.className = 'error-message submission-error';
//                     errorDiv.innerHTML = `
//                         <p>We're sorry, but there was a problem submitting your request.</p>
//                         <p>Please try again or call our 24/7 support line: <a href="tel:${process.env.EMERGENCY_PHONE}">${process.env.EMERGENCY_PHONE}</a></p>
//                     `;
                    
//                     const form = document.getElementById('step-4-form');
//                     form.insertBefore(errorDiv, form.firstChild);
                    
//                     // Scroll to error message
//                     errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
//                 }
//             } catch (err) {
//                 console.error('Submission error:', err);
//                 this.hideLoadingState(step);
                
//                 // Show comprehensive error message with fallback options
//                 const errorDiv = document.createElement('div');
//                 errorDiv.className = 'error-message submission-error';
//                 errorDiv.innerHTML = `
//                     <h4>We're experiencing technical difficulties</h4>
//                     <p>Your request is important to us. Please try one of these options:</p>
//                     <ul>
//                         <li>Try submitting again in a few minutes</li>
//                         <li>Call our 24/7 support line: <a href="tel:${process.env.EMERGENCY_PHONE}">${process.env.EMERGENCY_PHONE}</a></li>
//                         <li>Email us directly: <a href="mailto:${process.env.SUPPORT_EMAIL}">${process.env.SUPPORT_EMAIL}</a></li>
//                     </ul>
//                 `;
                
//                 const form = document.getElementById('step-4-form');
//                 form.insertBefore(errorDiv, form.firstChild);
                
//                 // Scroll to error message
//                 errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
//             }
//         } else {
//             setTimeout(() => {
//                 this.hideLoadingState(step);
//                 this.progressToNextStep(step);
//             }, delay);
//         }
//     }
// // ...existing code...

//     collectFormData(form) {
//         // Collect radio button values
//         const radioInputs = form.querySelectorAll('input[type="radio"]:checked');
//         radioInputs.forEach(radio => {
//             this.formData[radio.name] = radio.value;
//         });

//         // Collect text inputs
//         const textInputs = form.querySelectorAll('input[type="text"], input[type="tel"], input[type="email"], textarea, select');
//         textInputs.forEach(input => {
//             if (input.value.trim()) {
//                 this.formData[input.name] = input.value.trim();
//             }
//         });

//         console.log('Collected form data:', this.formData);
//     }

//     validateForm(form) {
//         let isValid = true;
//         // Clear previous errors
//         this.clearAllErrors(form);

//         // Validate radio groups
//         const radioGroups = this.getRadioGroups(form);
//         radioGroups.forEach(groupName => {
//             const checkedRadio = form.querySelector(`input[name="${groupName}"]:checked`);
//             if (!checkedRadio) {
//                 this.showRadioGroupError(form, groupName, 'Please select an option');
//                 isValid = false;
//             }
//         });

//         // Validate required text fields
//         const requiredFields = form.querySelectorAll('input[required], textarea[required], select[required]');
//         requiredFields.forEach(field => {
//             if (!field.value || !field.value.trim()) {
//                 this.showFieldError(field, 'This field is required');
//                 isValid = false;
//             } else {
//                 // Specific validation
//                 if (field.type === 'email') {
//                     if (!this.isValidEmail(field.value)) {
//                         this.showFieldError(field, 'Please enter a valid email address');
//                         isValid = false;
//                     }
//                 } else if (field.type === 'tel') {
//                     if (!this.isValidPhone(field.value)) {
//                         this.showFieldError(field, 'Please enter a valid 10-digit phone number');
//                         isValid = false;
//                     }
//                 }
//             }
//         });

//         // Extra: Ensure email and phone are present and valid on step 3
//         if (form.id === 'step-3-form') {
//             const emailField = form.querySelector('input[name="email"]');
//             const phoneField = form.querySelector('input[name="phone"]');
//             if (!emailField.value || !this.isValidEmail(emailField.value)) {
//                 this.showFieldError(emailField, 'A valid email is required');
//                 isValid = false;
//             }
//             if (!phoneField.value || !this.isValidPhone(phoneField.value)) {
//                 this.showFieldError(phoneField, 'A valid 10-digit phone number is required');
//                 isValid = false;
//             }
//         }

//         console.log('Form validation result:', isValid);
//         return isValid;
//     }

//     getRadioGroups(form) {
//         const radioInputs = form.querySelectorAll('input[type="radio"]');
//         const groups = new Set();
//         radioInputs.forEach(radio => {
//             if (radio.hasAttribute('required')) {
//                 groups.add(radio.name);
//             }
//         });
//         return Array.from(groups);
//     }

//     clearAllErrors(form) {
//         // Clear field errors
//         const errorFields = form.querySelectorAll('.error');
//         errorFields.forEach(field => {
//             field.classList.remove('error', 'success');
//         });

//         // Clear error messages
//         const errorMessages = form.querySelectorAll('.error-message');
//         errorMessages.forEach(msg => msg.remove());

//         // Clear radio group errors
//         const radioOptions = form.querySelectorAll('.radio-option');
//         radioOptions.forEach(option => {
//             option.classList.remove('error');
//         });
//     }

//     showFieldError(field, message) {
//         field.classList.add('error');
        
//         // Remove existing error message
//         const existingError = field.parentNode.querySelector('.error-message');
//         if (existingError) {
//             existingError.remove();
//         }
        
//         // Add new error message
//         const errorDiv = document.createElement('div');
//         errorDiv.className = 'error-message';
//         errorDiv.textContent = message;
//         field.parentNode.appendChild(errorDiv);
//     }

//     showRadioGroupError(form, groupName, message) {
//         const radioButtons = form.querySelectorAll(`input[name="${groupName}"]`);
//         radioButtons.forEach(radio => {
//             const radioOption = radio.closest('.radio-option');
//             if (radioOption) {
//                 radioOption.classList.add('error');
//             }
//         });

//         // Add error message to the radio group
//         const firstRadio = radioButtons[0];
//         if (firstRadio) {
//             const radioGroup = firstRadio.closest('.radio-group');
//             if (radioGroup) {
//                 // Remove existing error
//                 const existingError = radioGroup.querySelector('.error-message');
//                 if (existingError) {
//                     existingError.remove();
//                 }

//                 const errorDiv = document.createElement('div');
//                 errorDiv.className = 'error-message';
//                 errorDiv.textContent = message;
//                 radioGroup.appendChild(errorDiv);
//             }
//         }
//     }

//     clearFieldError(field) {
//         field.classList.remove('error');
//         field.classList.add('success');
        
//         const errorMsg = field.parentNode.querySelector('.error-message');
//         if (errorMsg) {
//             errorMsg.remove();
//         }
//     }

//     isValidEmail(email) {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//     }

//     isValidPhone(phone) {
//         const phoneDigits = phone.replace(/\D/g, '');
//         return phoneDigits.length === 10;
//     }

//     formatPhoneNumber(e) {
//         let value = e.target.value.replace(/\D/g, '');
        
//         if (value.length >= 6) {
//             value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
//         } else if (value.length >= 3) {
//             value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
//         }
        
//         e.target.value = value;
//     }

//     progressToNextStep(currentStep) {
//         const currentForm = document.getElementById(`step-${currentStep}-form`);
//         const nextForm = document.getElementById(`step-${currentStep + 1}-form`);
        
//         if (currentForm && nextForm) {
//             // Hide current form
//             currentForm.classList.add('hidden');
            
//             // Show next form with animation
//             nextForm.classList.remove('hidden');
            
//             // Update progress indicator
//             this.updateProgressIndicator(currentStep + 1);
            
//             // Update current step
//             this.currentStep = currentStep + 1;
            
//             // Add transition effect
//             this.addStepTransition();
            
//             // Scroll to form if needed
//             this.scrollToForm();
            
//             console.log('Progressed to step', this.currentStep);
//         }
//     }

//     updateProgressIndicator(step) {
//         // Update progress steps
//         const progressSteps = document.querySelectorAll('.progress-step');
//         const progressLines = document.querySelectorAll('.progress-line');
        
//         progressSteps.forEach((stepEl, index) => {
//             const stepNumber = index + 1;
//             stepEl.classList.remove('active', 'completed');
            
//             if (stepNumber < step) {
//                 stepEl.classList.add('completed');
//             } else if (stepNumber === step) {
//                 stepEl.classList.add('active');
//             }
//         });
        
//         progressLines.forEach((line, index) => {
//             line.classList.remove('completed');
//             if (index < step - 1) {
//                 line.classList.add('completed');
//             }
//         });
//     }

//     setupStepNavigation() {
//         const progressSteps = document.querySelectorAll('.progress-step');
//         progressSteps.forEach((step, index) => {
//             step.style.cursor = 'pointer';
//             step.addEventListener('click', () => {
//                 const targetStep = index + 1;
//                 if (targetStep <= this.currentStep) {
//                     this.navigateToStep(targetStep);
//                 }
//             });
//         });
//     }

//     navigateToStep(targetStep) {
//         if (targetStep >= 1 && targetStep <= 4 && targetStep <= this.currentStep) {
//             // Hide all forms
//             for (let i = 1; i <= 4; i++) {
//                 const form = document.getElementById(`step-${i}-form`);
//                 if (form) {
//                     form.classList.add('hidden');
//                 }
//             }
            
//             // Show target form
//             const targetForm = document.getElementById(`step-${targetStep}-form`);
//             if (targetForm) {
//                 targetForm.classList.remove('hidden');
//                 this.currentStep = targetStep;
//                 this.updateProgressIndicator(targetStep);
//                 this.scrollToForm();
//             }
//         }
//     }

//     addStepTransition() {
//         const formContainer = document.querySelector('.form-container');
//         if (formContainer) {
//             formContainer.style.transform = 'scale(0.98)';
//             formContainer.style.transition = 'transform 0.2s ease';
            
//             setTimeout(() => {
//                 formContainer.style.transform = 'scale(1)';
//             }, 100);
//         }
//     }

//     scrollToForm() {
//         const formContainer = document.querySelector('.form-container');
//         if (formContainer) {
//             formContainer.scrollIntoView({ 
//                 behavior: 'smooth', 
//                 block: 'start' 
//             });
//         }
//     }

//     showLoadingState(step) {
//         const form = document.getElementById(`step-${step}-form`);
//         const button = form?.querySelector('.form-submit-btn');
        
//         if (button) {
//             button.classList.add('loading');
//             button.disabled = true;
//             button.textContent = 'Processing...';
//         }
//     }

//     hideLoadingState(step) {
//         const form = document.getElementById(`step-${step}-form`);
//         const button = form?.querySelector('.form-submit-btn');
        
//         if (button) {
//             button.classList.remove('loading');
//             button.disabled = false;
//             // Restore original button text based on step
//             const buttonTexts = {
//                 1: 'Next: Care Situation',
//                 2: 'Next: Contact Information',
//                 3: 'Next: Care Preferences',
//                 4: 'Submit Request'
//             };
//             button.textContent = buttonTexts[step] || 'Continue';
//         }
//     }

//     showSuccessModal() {
//         const modal = document.getElementById('success-modal');
//         const nextStepsContent = document.getElementById('next-steps-content');
        
//         // Determine next steps based on urgency
//         const urgency = this.formData.urgency_level || 'week';
//         const template = this.nextStepsTemplates[urgency];
        
//         // Build next steps content
//         let stepsHTML = `
//             <h4>${template.title}</h4>
//             <p class="timeframe">${template.timeframe}</p>
//             <h5>What happens next:</h5>
//             <ul>
//         `;
        
//         template.steps.forEach(step => {
//             stepsHTML += `<li>${step}</li>`;
//         });
        
//         stepsHTML += '</ul>';
        
//         nextStepsContent.innerHTML = stepsHTML;
        
//         // Show modal
//         modal.classList.remove('hidden');
//         document.body.style.overflow = 'hidden';
        
//         // Track conversion
//         this.trackConversion();
        
//         // Add personalization if name is available
//         if (this.formData.first_name) {
//             const modalHeader = modal.querySelector('.modal-header h3');
//             modalHeader.textContent = `Thank You, ${this.formData.first_name}`;
//         }
//     }

//     setupModalHandlers() {
//         const modal = document.getElementById('success-modal');
//         const closeBtn = document.getElementById('close-modal');
//         const overlay = modal?.querySelector('.modal-overlay');

//         if (closeBtn) {
//             closeBtn.addEventListener('click', () => this.closeModal());
//         }

//         if (overlay) {
//             overlay.addEventListener('click', () => this.closeModal());
//         }

//         // Escape key handler
//         document.addEventListener('keydown', (e) => {
//             if (e.key === 'Escape' && !modal?.classList.contains('hidden')) {
//                 this.closeModal();
//             }
//         });
//     }

//     closeModal() {
//         const modal = document.getElementById('success-modal');
//         modal.classList.add('hidden');
//         document.body.style.overflow = '';
//     }

//     setupValidation() {
//         // Real-time validation feedback
//         const allInputs = document.querySelectorAll('.form-control, input[type="radio"]');
        
//         allInputs.forEach(input => {
//             if (input.type === 'radio') {
//                 input.addEventListener('change', () => {
//                     this.clearRadioGroupError(input);
//                 });
//             } else {
//                 input.addEventListener('blur', () => {
//                     if (input.hasAttribute('required')) {
//                         this.validateSingleField(input);
//                     }
//                 });
                
//                 input.addEventListener('input', () => {
//                     if (input.classList.contains('error')) {
//                         this.validateSingleField(input);
//                     }
//                 });
//             }
//         });
//     }

//     clearRadioGroupError(radioInput) {
//         const radioGroup = document.querySelectorAll(`input[name="${radioInput.name}"]`);
//         radioGroup.forEach(radio => {
//             const radioOption = radio.closest('.radio-option');
//             if (radioOption) {
//                 radioOption.classList.remove('error');
//             }
//         });

//         // Remove error message from radio group
//         const radioGroupContainer = radioInput.closest('.radio-group');
//         if (radioGroupContainer) {
//             const errorMsg = radioGroupContainer.querySelector('.error-message');
//             if (errorMsg) {
//                 errorMsg.remove();
//             }
//         }
//     }

//     validateSingleField(field) {
//         if (!field.value || !field.value.trim()) {
//             if (field.hasAttribute('required')) {
//                 this.showFieldError(field, 'This field is required');
//             }
//         } else {
//             this.clearFieldError(field);
//         }
//     }

//     setupProgressTracking() {
//         // Track form progression and engagement
//         this.startTime = Date.now();
        
//         // Track time spent on each step
//         this.stepStartTime = Date.now();
        
//         // Add visibility tracking
//         document.addEventListener('visibilitychange', () => {
//             if (document.visibilityState === 'visible') {
//                 this.trackEngagement('page_visible');
//             } else {
//                 this.trackEngagement('page_hidden');
//             }
//         });
//     }

//     trackConversion() {
//         const conversionData = {
//             timestamp: new Date().toISOString(),
//             formData: this.formData,
//             completionTime: Date.now() - this.startTime,
//             steps: this.currentStep
//         };
        
//         // In a real application, this would send to analytics
//         console.log('Hospice guidance request submitted:', conversionData);
        
//         // Simulate HIPAA-compliant data handling
//         this.handleHIPAACompliantData(conversionData);
//     }

//     trackEngagement(event) {
//         // Track user engagement events
//         console.log('User engagement:', {
//             event,
//             step: this.currentStep,
//             timestamp: Date.now()
//         });
//     }

//     handleHIPAACompliantData(data) {
//         // Simulate HIPAA-compliant data handling
//         console.log('Processing data with HIPAA compliance protocols...');
        
//         // In a real application, this would:
//         // 1. Encrypt sensitive data
//         // 2. Log access attempts
//         // 3. Ensure secure transmission
//         // 4. Implement data retention policies
        
//         // For demonstration, we'll show this is being handled securely
//         const secureData = {
//             requestId: this.generateSecureId(),
//             timestamp: data.timestamp,
//             urgencyLevel: data.formData.urgency_level,
//             contactPreference: data.formData.best_time,
//             // PHI is handled separately with encryption
//             hasContactInfo: !!(data.formData.phone && data.formData.first_name)
//         };
        
//         console.log('Secure processing complete:', secureData);
//     }

//     generateSecureId() {
//         // Generate a secure, random ID
//         return 'req_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
//     }

//     // Utility method for emergency situations
//     triggerEmergencySupport() {
//         if (this.formData.urgency_level === 'immediate') {
//             console.log('Emergency hospice support triggered');
//             // In real application, this would alert support staff immediately
//         }
//     }

//     // Method to provide immediate resources
//     provideImmediateResources() {
//         return {
//             crisisLine: '(214) 555-CARE (2273)',
//             emergencyServices: '911',
//             resources: [
//                 'Pain management techniques',
//                 'Family support guidelines',
//                 'Medicare hospice coverage information',
//                 'Local hospice directory'
//             ]
//         };
//     }
// }

// // Initialize the application
// document.addEventListener('DOMContentLoaded', () => {
//     const hospiceGuidance = new FamilyHospiceGuidance();
    
//     // Add CSS for dynamic styles
//     const dynamicStyles = document.createElement('style');
//     dynamicStyles.textContent = `
//         .timeframe {
//             background: var(--color-bg-1);
//             padding: var(--space-12) var(--space-16);
//             border-radius: var(--radius-base);
//             font-weight: var(--font-weight-semibold);
//             color: var(--color-primary);
//             margin: var(--space-12) 0;
//             text-align: center;
//             border: 1px solid rgba(var(--color-primary), 0.2);
//         }
        
//         .radio-option.error {
//             border-color: var(--color-error);
//             background: rgba(var(--color-error-rgb), 0.05);
//         }
        
//         .form-container {
//             transition: transform 0.2s ease;
//         }
        
//         .progress-step {
//             cursor: pointer;
//             user-select: none;
//         }
        
//         .progress-step:hover:not(.active) {
//             background: var(--color-secondary-hover);
//         }
        
//         @media (prefers-reduced-motion: reduce) {
//             .form-container {
//                 transition: none;
//             }
//         }
        
//         /* Accessibility improvements */
//         @media (prefers-contrast: high) {
//             .progress-step {
//                 border: 2px solid var(--color-border);
//             }
            
//             .progress-step.active {
//                 border-color: var(--color-primary);
//             }
//         }
        
//         /* Focus management for form steps */
//         .guidance-form:not(.hidden) .form-header h3 {
//             scroll-margin-top: 2rem;
//         }
//     `;
    
//     document.head.appendChild(dynamicStyles);
    
//     // Add ARIA live region for screen readers
//     const liveRegion = document.createElement('div');
//     liveRegion.setAttribute('aria-live', 'polite');
//     liveRegion.setAttribute('aria-atomic', 'true');
//     liveRegion.className = 'sr-only';
//     liveRegion.id = 'form-announcements';
//     document.body.appendChild(liveRegion);
    
//     // Announce step changes for accessibility
//     const originalProgressMethod = hospiceGuidance.progressToNextStep;
//     hospiceGuidance.progressToNextStep = function(currentStep) {
//         originalProgressMethod.call(this, currentStep);
        
//         const liveRegion = document.getElementById('form-announcements');
//         const nextStep = currentStep + 1;
//         const stepTitles = {
//             2: 'Current Care Situation',
//             3: 'Contact Information',
//             4: 'Care Preferences and Coverage'
//         };
        
//         if (liveRegion && stepTitles[nextStep]) {
//             liveRegion.textContent = `Now on step ${nextStep}: ${stepTitles[nextStep]}`;
//         }
//     };
    
//     // Global error handler for graceful degradation
//     window.addEventListener('error', (e) => {
//         console.error('Application error:', e.error);
        
//         // Provide fallback contact information
//         const errorDiv = document.createElement('div');
//         errorDiv.className = 'error-fallback';
//         errorDiv.style.cssText = `
//             position: fixed;
//             bottom: 20px;
//             right: 20px;
//             background: var(--color-error);
//             color: white;
//             padding: var(--space-16);
//             border-radius: var(--radius-base);
//             box-shadow: var(--shadow-lg);
//             z-index: 1001;
//             max-width: 300px;
//         `;
//         errorDiv.innerHTML = `
//             <p><strong>Technical Issue</strong></p>
//             <p>Please call us directly: <a href="tel:2145552273" style="color: white; text-decoration: underline;">(214) 555-CARE</a></p>
//             <button onclick="this.parentNode.remove()" style="background: transparent; border: 1px solid white; color: white; padding: 4px 8px; border-radius: 4px; cursor: pointer;">Close</button>
//         `;
        
//         document.body.appendChild(errorDiv);
        
//         setTimeout(() => {
//             if (errorDiv.parentNode) {
//                 errorDiv.remove();
//             }
//         }, 10000);
//     });
    
//     // Performance monitoring
//     if ('PerformanceObserver' in window) {
//         const observer = new PerformanceObserver((list) => {
//             const entries = list.getEntries();
//             entries.forEach(entry => {
//                 if (entry.entryType === 'navigation') {
//                     console.log('Page load performance:', {
//                         domContentLoaded: entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart,
//                         loadComplete: entry.loadEventEnd - entry.loadEventStart
//                     });
//                 }
//             });
//         });
        
//         observer.observe({ entryTypes: ['navigation'] });
//     }
// });

// // Export for testing purposes
// if (typeof module !== 'undefined' && module.exports) {
//     module.exports = FamilyHospiceGuidance;
// }