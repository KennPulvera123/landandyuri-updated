import React, { useState, useEffect } from 'react';
import '../../payment-styles.css';
import FloatingElements from './FloatingElements';

const PaymentPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [confirmationData, setConfirmationData] = useState({
    paymentDate: '',
    paymentReference: '',
    accountName: ''
  });
  
  const PAYMENT_FORM_STORAGE_KEY = 'paymentFormData';
  const PAYMENT_METHOD_STORAGE_KEY = 'selectedPaymentMethod';
  
  // Countdown timer state (15 minutes = 900 seconds)
  const [timeLeft, setTimeLeft] = useState(900);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    // Get booking data from localStorage or navigation state
    const data = JSON.parse(localStorage.getItem('currentBooking') || '{}');
    setBookingData(data);
    
    // Load saved payment form data
    const savedPaymentData = localStorage.getItem(PAYMENT_FORM_STORAGE_KEY);
    if (savedPaymentData) {
      try {
        const parsedData = JSON.parse(savedPaymentData);
        setConfirmationData(parsedData);
      } catch (error) {
        console.error('Error loading saved payment form data:', error);
        localStorage.removeItem(PAYMENT_FORM_STORAGE_KEY);
      }
    }
    
    // Load saved payment method
    const savedPaymentMethod = localStorage.getItem(PAYMENT_METHOD_STORAGE_KEY);
    if (savedPaymentMethod) {
      setSelectedMethod(savedPaymentMethod);
    }
  }, []);

  // Save payment form data to localStorage whenever it changes
  useEffect(() => {
    if (confirmationData.paymentDate || confirmationData.paymentReference || confirmationData.accountName) {
      localStorage.setItem(PAYMENT_FORM_STORAGE_KEY, JSON.stringify(confirmationData));
    }
  }, [confirmationData]);

  // Save selected payment method to localStorage
  useEffect(() => {
    if (selectedMethod) {
      localStorage.setItem(PAYMENT_METHOD_STORAGE_KEY, selectedMethod);
    }
  }, [selectedMethod]);

  // Countdown timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setIsExpired(true);
      // Auto-redirect after 5 seconds when expired
      setTimeout(() => {
        alert('Session expired. Please start over with your booking.');
        window.location.href = '/';
      }, 5000);
    }
  }, [timeLeft]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Get countdown status for styling
  const getCountdownStatus = () => {
    if (timeLeft <= 0) return 'expired';
    if (timeLeft <= 300) return 'warning'; // 5 minutes warning
    if (timeLeft <= 600) return 'caution'; // 10 minutes caution
    return 'normal';
  };

  const handleMethodSelection = (method) => {
    setSelectedMethod(method);
    document.getElementById('step-1-next').disabled = false;
  };

  const proceedToStep2 = () => {
    if (selectedMethod) {
      setCurrentStep(2);
    }
  };

  const proceedToStep3 = () => {
    setCurrentStep(3);
  };

  const handleConfirmationSubmit = (e) => {
    e.preventDefault();
    // Save payment confirmation to localStorage
    const paymentData = {
      ...bookingData,
      ...confirmationData,
      paymentMethod: selectedMethod,
      paymentStatus: 'pending-verification',
      paymentAmount: 2000
    };
    
    // Save to localStorage
    const existingBookings = JSON.parse(localStorage.getItem('assessmentBookings') || '[]');
    existingBookings.push(paymentData);
    localStorage.setItem('assessmentBookings', JSON.stringify(existingBookings));
    
    // Clear current booking and payment form data
    localStorage.removeItem('currentBooking');
    localStorage.removeItem(PAYMENT_FORM_STORAGE_KEY);
    localStorage.removeItem(PAYMENT_METHOD_STORAGE_KEY);
    
    // Redirect to success page or show success message
    alert('Payment confirmation submitted! We will verify your payment and contact you soon.');
    window.location.href = '/';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setConfirmationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <FloatingElements />
      
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <h2>Lance and Yuri Kids Spot Naga City</h2>
          </div>
          <div className="nav-menu">
            <a href="/" className="nav-link">
              <i className="fas fa-arrow-left"></i> Back to Home
            </a>
          </div>
        </div>
      </nav>

      {/* Payment Section */}
      <section className="payment-section">
        <div className="container">
          <div className="payment-container">
            {/* Compact Header with Summary */}
            <div className="payment-header-compact">
              <div className="header-row">
                <div className="step-indicator-compact">
                  <div className={`step ${currentStep >= 1 ? 'completed' : ''}`}>1</div>
                  <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>2</div>
                  <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>3</div>
                </div>
                <div className="header-motivation-compact">
                  <i className="fas fa-heart"></i>
                  <span><strong>Don't Risk Your Child's Future!</strong> Early intervention is key to your child's development.</span>
                </div>
              </div>
              
              <div className="title-summary-row">
                <div className="payment-title">
                  <h1>Pay Booking Fee</h1>
                  <p>Secure your appointment with ₱2,000 reservation fee</p>
                </div>
                <div className="booking-summary-compact">
                  <div className="summary-card">
                    <div className="summary-item">
                      <span>Service:</span>
                      <span id="selected-service">Initial Assessment</span>
                    </div>
                    <div className="summary-item">
                      <span>Date:</span>
                      <span id="booking-date">{bookingData?.appointmentDate}</span>
                    </div>
                    <div className="summary-item total">
                      <span>Fee:</span>
                      <span className="amount" id="booking-fee">₱2,000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Multi-Step Payment Process */}
            <div className="payment-steps">
              
              {/* Step 1: Payment Method Selection */}
              {currentStep === 1 && (
                <div className="payment-step" id="step-1" data-step="1">
                  <div className="step-header-compact">
                    <h3><i className="fas fa-credit-card"></i> Step 1: Select Payment Method</h3>
                    <p>Choose your preferred payment method to proceed</p>
                  </div>
                  
                  <div className="payment-methods-compact">
                    {/* GCash Option */}
                    <div 
                      className={`payment-option ${selectedMethod === 'gcash' ? 'selected' : ''}`} 
                      onClick={() => handleMethodSelection('gcash')}
                    >
                      <div className="payment-header-option">
                        <div className="payment-icon gcash-icon">
                          <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iOCIgZmlsbD0iIzAwN0RGRiIvPgo8cGF0aCBkPSJNMTIgMTJIMjhWMTZIMTJWMTJaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTIgMThIMjRWMjJIMTJWMThaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTIgMjRIMjhWMjhIMTJWMjRaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K" alt="GCash" />
                        </div>
                        <div className="payment-info">
                          <h4>GCash</h4>
                          <p>Scan QR code and pay instantly</p>
                          <div className="payment-features">
                            <span className="feature">✓ Instant payment</span>
                            <span className="feature">✓ Secure transaction</span>
                          </div>
                        </div>
                        <div className="payment-radio">
                          <input 
                            type="radio" 
                            name="payment-method" 
                            value="gcash" 
                            id="gcash"
                            checked={selectedMethod === 'gcash'}
                            onChange={() => {}}
                          />
                          <label htmlFor="gcash"></label>
                        </div>
                      </div>
                    </div>

                    {/* Bank Transfer Option */}
                    <div 
                      className={`payment-option ${selectedMethod === 'bank' ? 'selected' : ''}`} 
                      onClick={() => handleMethodSelection('bank')}
                    >
                      <div className="payment-header-option">
                        <div className="payment-icon bank-icon">
                          <i className="fas fa-university"></i>
                        </div>
                        <div className="payment-info">
                          <h4>Bank Transfer</h4>
                          <p>Transfer directly to our bank account</p>
                          <div className="payment-features">
                            <span className="feature">✓ BDO & BPI supported</span>
                            <span className="feature">✓ Online banking</span>
                          </div>
                        </div>
                        <div className="payment-radio">
                          <input 
                            type="radio" 
                            name="payment-method" 
                            value="bank" 
                            id="bank"
                            checked={selectedMethod === 'bank'}
                            onChange={() => {}}
                          />
                          <label htmlFor="bank"></label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="step-actions">
                    <button className="btn-back" onClick={() => window.history.back()}>
                      <i className="fas fa-arrow-left"></i>
                      Back to Booking
                    </button>
                    <button 
                      className="btn-next" 
                      id="step-1-next" 
                      disabled={!selectedMethod}
                      onClick={proceedToStep2}
                    >
                      Continue to Payment
                      <i className="fas fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Payment Details - GCash */}
              {currentStep === 2 && selectedMethod === 'gcash' && (
                <div className="payment-step" id="step-2-gcash" data-step="2">
                  <div className="step-header-compact">
                    <h3><i className="fas fa-qrcode"></i> Step 2: Scan QR Code</h3>
                    <div className={`payment-warning-inline countdown-${getCountdownStatus()}`}>
                      <i className="fas fa-clock"></i>
                      <span>
                        {isExpired ? (
                          <span className="expired-text">⚠️ Session Expired - Please start over</span>
                        ) : (
                          <>
                            <span className="countdown-text">Time remaining: </span>
                            <span className="countdown-timer">{formatTime(timeLeft)}</span>
                            <span className="countdown-note"> • No refunds</span>
                          </>
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="qr-payment-container-compact">
                    <div className="payment-details-compact">
                      <div className="payment-steps-compact">
                        <h4>How to Pay:</h4>
                        <ol>
                          <li style={{ marginBottom: '2rem' }}>
                            <span style={{ fontWeight: 'bold', minWidth: '160px' }}>Option 1: Scan QR Code</span>
                            <div style={{ marginLeft: '2.5rem', marginTop: '1rem' }}>
                              <button 
                                id="show-qr-btn" 
                                className="btn-show-qr" 
                                type="button" 
                                onClick={() => setShowQR(!showQR)}
                              >
                                <i className="fas fa-qrcode"></i> {showQR ? 'Hide' : 'Show'} QR Code
                              </button>
                              {showQR && (
                                <div className="qr-code-section-compact" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem' }}>
                                  <div className="qr-code-wrapper">
                                    <img id="gcash-qr-img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==" alt="GCash QR Code" />
                                  </div>
                                  <div className="payment-amount-compact">
                                    <span className="amount">₱2,000.00</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </li>
                          <li>
                            <span style={{ fontWeight: 'bold' }}>Option 2: Send to GCash Account</span>
                            <div className="gcash-account-info-compact" style={{ marginTop: '1rem' }}>
                              <h4><i className="fas fa-mobile-alt"></i> GCash Details</h4>
                              <div className="account-detail">
                                <span className="label">Name:</span>
                                <span className="value">Lance and Yuri Kids Spot Naga City</span>
                              </div>
                              <div className="account-detail">
                                <span className="label">Number:</span>
                                <span className="value">09123456789</span>
                              </div>
                            </div>
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>

                  <div className="step-actions">
                    <button 
                      className="btn-back" 
                      onClick={() => setCurrentStep(1)}
                      disabled={isExpired}
                    >
                      <i className="fas fa-arrow-left"></i>
                      Back
                    </button>
                    <button 
                      className="btn-next" 
                      onClick={proceedToStep3}
                      disabled={isExpired}
                    >
                      {isExpired ? 'Session Expired' : 'Payment Completed'}
                      {!isExpired && <i className="fas fa-arrow-right"></i>}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Payment Details - Bank Transfer */}
              {currentStep === 2 && selectedMethod === 'bank' && (
                <div className="payment-step" id="step-2-bank" data-step="2">
                  <div className="step-header-compact">
                    <h3><i className="fas fa-university"></i> Step 2: Bank Transfer</h3>
                    <div className={`payment-warning-inline countdown-${getCountdownStatus()}`}>
                      <i className="fas fa-clock"></i>
                      <span>
                        {isExpired ? (
                          <span className="expired-text">⚠️ Session Expired - Please start over</span>
                        ) : (
                          <>
                            <span className="countdown-text">Time remaining: </span>
                            <span className="countdown-timer">{formatTime(timeLeft)}</span>
                            <span className="countdown-note"> • No refunds</span>
                          </>
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="qr-payment-container-compact">
                    <div className="payment-details-compact">
                      <div className="payment-steps-compact">
                        <h4>How to Pay:</h4>
                        <ol>
                          <li style={{ marginBottom: '2rem' }}>
                            <span style={{ fontWeight: 'bold', minWidth: '160px' }}>Option 1: Scan QR Code</span>
                            <div style={{ marginLeft: '2.5rem', marginTop: '1rem' }}>
                              <button 
                                id="show-bank-qr-btn" 
                                className="btn-show-qr" 
                                type="button" 
                                onClick={() => setShowQR(!showQR)}
                              >
                                <i className="fas fa-qrcode"></i> {showQR ? 'Hide' : 'Show'} QR Code
                              </button>
                              {showQR && (
                                <div className="qr-code-section-compact" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem' }}>
                                  <div className="qr-code-wrapper">
                                    <img id="bank-qr-img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==" alt="Bank Transfer QR Code" />
                                  </div>
                                  <div className="payment-amount-compact">
                                    <span className="amount">₱2,000.00</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </li>
                          <li>
                            <span style={{ fontWeight: 'bold' }}>Option 2: Bank Transfer Details</span>
                            <div className="gcash-account-info-compact" style={{ marginTop: '1rem' }}>
                              <h4><i className="fas fa-university"></i> Bank Details</h4>
                              <div className="account-detail">
                                <span className="label">Bank:</span>
                                <span className="value">BDO Unibank</span>
                              </div>
                              <div className="account-detail">
                                <span className="label">Account Name:</span>
                                <span className="value">Lance and Yuri Kids Spot Naga City</span>
                              </div>
                              <div className="account-detail">
                                <span className="label">Account Number:</span>
                                <span className="value">1234567890123456</span>
                              </div>
                              <div className="account-detail">
                                <span className="label">Amount:</span>
                                <span className="value">₱2,000.00</span>
                              </div>
                            </div>
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>

                  <div className="step-actions">
                    <button 
                      className="btn-back" 
                      onClick={() => setCurrentStep(1)}
                      disabled={isExpired}
                    >
                      <i className="fas fa-arrow-left"></i>
                      Back
                    </button>
                    <button 
                      className="btn-next" 
                      onClick={proceedToStep3}
                      disabled={isExpired}
                    >
                      {isExpired ? 'Session Expired' : 'Payment Completed'}
                      {!isExpired && <i className="fas fa-arrow-right"></i>}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Payment Confirmation */}
              {currentStep === 3 && (
                <div className="payment-step" id="step-3" data-step="3">
                  <div className="step-header">
                    <h3><i className="fas fa-check-circle"></i> Step 3: Confirm Your Payment</h3>
                    <p>Please provide your payment details for verification</p>
                  </div>

                  <div className="confirmation-form">
                    <form id="payment-confirmation-form" onSubmit={handleConfirmationSubmit}>
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="payment-date">Date of Payment</label>
                          <input 
                            type="date" 
                            id="payment-date" 
                            name="paymentDate" 
                            value={confirmationData.paymentDate}
                            onChange={handleInputChange}
                            required 
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="payment-reference">Reference Number</label>
                          <input 
                            type="text" 
                            id="payment-reference" 
                            name="paymentReference" 
                            className="form-control" 
                            placeholder="Enter transaction reference" 
                            value={confirmationData.paymentReference}
                            onChange={handleInputChange}
                            required 
                            pattern="[0-9]{12}" 
                            maxLength="12" 
                            inputMode="numeric" 
                            title="Reference number must be exactly 12 digits"
                          />
                          <small className="form-text text-muted">Reference number must be exactly 12 digits.</small>
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="account-name">Account Name</label>
                          <input 
                            type="text" 
                            id="account-name" 
                            name="accountName" 
                            placeholder="Enter account holder name" 
                            value={confirmationData.accountName}
                            onChange={handleInputChange}
                            required 
                          />
                        </div>
                      </div>

                      <div className="payment-summary-confirmation">
                        <h4>Payment Summary</h4>
                        <div className="summary-item">
                          <span>Payment Method:</span>
                          <span>{selectedMethod === 'gcash' ? 'GCash' : 'Bank Transfer'}</span>
                        </div>
                        <div className="summary-item">
                          <span>Reservation Fee:</span>
                          <span>₱2,000.00</span>
                        </div>
                        <div className="summary-item">
                          <span>Service:</span>
                          <span>Initial Assessment</span>
                        </div>
                      </div>

                      <div className="step-actions">
                        <button type="button" className="btn-back" onClick={() => setCurrentStep(2)}>
                          <i className="fas fa-arrow-left"></i>
                          Back
                        </button>
                        <button type="submit" className="btn-submit">
                          <i className="fas fa-check"></i>
                          Submit Payment Confirmation
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Security Notice */}
      <div className="security-notice">
        <div className="container">
          <div className="security-content">
            <i className="fas fa-shield-alt"></i>
            <div>
              <h4>Secure Payment</h4>
              <p>Your payment information is encrypted and secure. We never store your financial details.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage; 