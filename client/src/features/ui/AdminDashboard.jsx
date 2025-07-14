import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../admin-styles.css';
import FloatingElements from './FloatingElements';
import Header from './Header';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState('blumentritt');
  const [currentView, setCurrentView] = useState('assessments');
  const [patients, setPatients] = useState({
    assessments: []
  });
  
  // Booking details modal state
  const [isBookingDetailsOpen, setIsBookingDetailsOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Authentication modal state
  const [authEmail, setAuthEmail] = useState('test@gmail.com');
  const [authPassword, setAuthPassword] = useState('admin123');

  useEffect(() => {
    // Check if user is already logged in as admin from main auth system
    const userData = localStorage.getItem('userData');
    const userToken = localStorage.getItem('userToken');
    
    if (userData && userToken) {
      try {
        const user = JSON.parse(userData);
        if (user.role === 'admin') {
          // User is already authenticated as admin
          setIsAuthenticated(true);
          localStorage.setItem('adminAuth', 'true');
          loadPatientData();
          return;
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
    
    // Fallback: Check if admin is already authenticated via admin-specific auth
    const adminAuth = localStorage.getItem('adminAuth');
    if (adminAuth) {
      setIsAuthenticated(true);
      loadPatientData();
    }
  }, []);

  const adminLogin = () => {
    // Simple authentication check
    if (authEmail === 'test@gmail.com' && authPassword === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      loadPatientData();
    } else {
      alert('Invalid credentials!');
    }
  };

  const adminLogout = () => {
    // Clear all authentication data
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('userData');
    localStorage.removeItem('userToken');
    setIsAuthenticated(false);
    navigate('/'); // Redirect to main page
  };

  const loadPatientData = () => {
    // Load patient data from localStorage or API
    const storedBookings = JSON.parse(localStorage.getItem('assessmentBookings') || '[]');
    setPatients(prev => ({
      ...prev,
      assessments: storedBookings
    }));
  };

  const viewBookingDetails = (booking) => {
    setSelectedBooking(booking);
    setIsBookingDetailsOpen(true);
  };

  const closeBookingDetails = () => {
    setIsBookingDetailsOpen(false);
    setSelectedBooking(null);
  };

  const markBookingDone = (bookingIndex) => {
    const updatedBookings = [...patients.assessments];
    updatedBookings[bookingIndex] = {
      ...updatedBookings[bookingIndex],
      status: 'completed',
      completedAt: new Date().toISOString()
    };
    
    // Update localStorage
    localStorage.setItem('assessmentBookings', JSON.stringify(updatedBookings));
    
    // Update state
    setPatients(prev => ({
      ...prev,
      assessments: updatedBookings
    }));
    
    // Close modal if it's the current booking
    if (selectedBooking && patients.assessments.findIndex(b => b === selectedBooking) === bookingIndex) {
      closeBookingDetails();
    }
  };

  const verifyPayment = (bookingIndex) => {
    const updatedBookings = [...patients.assessments];
    updatedBookings[bookingIndex] = {
      ...updatedBookings[bookingIndex],
      paymentStatus: 'verified',
      verifiedAt: new Date().toISOString()
    };
    
    // Update localStorage
    localStorage.setItem('assessmentBookings', JSON.stringify(updatedBookings));
    
    // Update state
    setPatients(prev => ({
      ...prev,
      assessments: updatedBookings
    }));
    
    // Close modal if it's the current booking
    if (selectedBooking && patients.assessments.findIndex(b => b === selectedBooking) === bookingIndex) {
      closeBookingDetails();
    }
  };

  const filterByBranch = (branch) => {
    setSelectedBranch(branch);
    // Filter patients by branch
  };

  const switchPatientView = (view) => {
    setCurrentView(view);
  };

  // Make adminLogout available globally
  useEffect(() => {
    window.adminLogout = adminLogout;
    return () => {
      delete window.adminLogout;
    };
  }, []);

  if (!isAuthenticated) {
    return (
      <>
        <FloatingElements />
        <Header isAdmin={true} />
        <div id="authCheckModal" className="auth-modal" style={{ display: 'block' }}>
          <div className="auth-modal-content">
            <h2>🔒 Admin Authentication Required</h2>
            <p>Please log in with admin credentials to access the admin dashboard.</p>
            <div className="auth-form">
              <input 
                type="email" 
                id="adminEmail" 
                placeholder="Admin Email" 
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
              />
              <input 
                type="password" 
                id="adminPassword" 
                placeholder="Admin Password" 
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
              />
              <button onClick={adminLogin} className="btn-primary">Login as Admin</button>
            </div>
            <p className="auth-note">Default admin: test@gmail.com / admin123</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <FloatingElements />
      <Header isAdmin={true} onLogout={adminLogout} />
      
      <section className="admin-section">
        <div className="container">
          {/* Welcome Header */}
          <div className="welcome-header">
            <div className="welcome-content">
              <h1>👋 Welcome to Lance and Yuri Kids Spot Naga City Admin</h1>
              <p className="welcome-subtitle">Manage your patient appointments easily and efficiently</p>
            </div>
            
            {/* Branch Selection */}
            <div className="branch-filter-section">
              <div className="branch-filter-header">
                <h3>📍 Select Your Branch</h3>
                <p>Choose your branch to view patients for your location</p>
              </div>
              <div className="admin-branch-boxes">
                <div className="admin-branch-box" data-value="blumentritt">
                  <input 
                    type="radio" 
                    id="adminBranchMain" 
                    name="adminBranchLocation" 
                    value="blumentritt" 
                    onChange={() => filterByBranch('blumentritt')} 
                    checked={selectedBranch === 'blumentritt'}
                  />
                  <label htmlFor="adminBranchMain" className="admin-branch-label">
                    <div className="admin-branch-icon">🏢</div>
                    <div className="admin-branch-info">
                      <h4>Main Branch</h4>
                      <p>Blumentritt St., Naga City</p>
                    </div>
                    <div className="admin-branch-badge main-badge">PRIMARY</div>
                  </label>
                </div>
                <div className="admin-branch-box" data-value="delrosario">
                  <input 
                    type="radio" 
                    id="adminBranchSatellite" 
                    name="adminBranchLocation" 
                    value="delrosario" 
                    onChange={() => filterByBranch('delrosario')}
                    checked={selectedBranch === 'delrosario'}
                  />
                  <label htmlFor="adminBranchSatellite" className="admin-branch-label">
                    <div className="admin-branch-icon">📡</div>
                    <div className="admin-branch-info">
                      <h4>Satellite Branch</h4>
                      <p>Del Rosario, Naga City</p>
                    </div>
                    <div className="admin-branch-badge satellite-badge">SATELLITE</div>
                  </label>
                </div>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="quick-stats">
              <div className="stat-item">
                <div className="stat-number" id="branchPendingCount">
                  {patients.assessments.filter(p => p.branchLocation === selectedBranch).length}
                </div>
                <div className="stat-label">Total Bookings</div>
              </div>
              <div className="stat-item">
                <div className="stat-number" id="branchVerifiedCount">
                  {patients.assessments.filter(p => p.branchLocation === selectedBranch && p.paymentStatus === 'verified').length}
                </div>
                <div className="stat-label">Verified Payments</div>
              </div>
            </div>
          </div>

          {/* Main Actions */}
          <div className="main-actions">
            <button 
              className={`big-action-btn ${currentView === 'assessments' ? 'active' : ''}`} 
              data-view="assessments" 
              onClick={() => switchPatientView('assessments')}
            >
              🩺 Assessment Bookings
              <span className="action-count" id="assessmentCount">
                {patients.assessments.length}
              </span>
            </button>
            <button 
              className={`big-action-btn ${currentView === 'payments' ? 'active' : ''}`} 
              data-view="payments" 
              onClick={() => switchPatientView('payments')}
            >
              💳 Payment Information
              <span className="action-count" id="paymentCount">
                {patients.assessments.length}
              </span>
            </button>
          </div>

          {/* Assessment Bookings View */}
          {currentView === 'assessments' && (
            <div id="assessments-view" className="patient-list-container active">
              <div className="list-header">
                <h2>🩺 Assessment Bookings</h2>
                <div className="help-text">
                  <div className="help-item">
                    <span className="help-icon">📅</span>
                    <span>Patients who booked assessments from the website</span>
                  </div>
                </div>
              </div>

              <div className="table-wrapper table-wrapper-enhanced">
                <table className="patients-table">
                  <thead>
                    <tr>
                      <th className="col-patient">Patient Info</th>
                      <th className="col-contact">Contact & Service</th>
                      <th className="col-appointment">Assessment Details</th>
                      <th className="col-actions">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.assessments
                      .filter(patient => patient.branchLocation === selectedBranch)
                      .map((patient, index) => {
                        const originalIndex = patients.assessments.findIndex(p => p === patient);
                        const isCompleted = patient.status === 'completed';
                        
                        return (
                          <tr key={index} className={isCompleted ? 'completed-booking' : ''}>
                            <td>
                              <div className="patient-info">
                                <strong>{patient.guardianName}</strong><br />
                                Child: {patient.childName}, {patient.childAge || 'Age not specified'}
                                {isCompleted && <span className="completed-badge">✅ Completed</span>}
                              </div>
                            </td>
                            <td>
                              <div className="contact-info">
                                {patient.guardianPhone}<br />
                                {patient.guardianEmail}
                              </div>
                            </td>
                            <td>
                              <div className="appointment-info">
                                Date: {patient.appointmentDate}<br />
                                Time: {patient.selectedTime}
                                {isCompleted && <div className="completed-date">Completed: {new Date(patient.completedAt).toLocaleDateString()}</div>}
                              </div>
                            </td>
                            <td>
                              <div className="action-buttons">
                                <button 
                                  className="btn-action view-details" 
                                  onClick={() => viewBookingDetails(patient)}
                                  title="View booking details"
                                >
                                  <i className="fas fa-eye"></i>
                                </button>
                                {!isCompleted && (
                                  <button 
                                    className="btn-action done" 
                                    onClick={() => markBookingDone(originalIndex)}
                                    title="Mark as done"
                                  >
                                    <i className="fas fa-check"></i>
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                
                {patients.assessments.filter(p => p.branchLocation === selectedBranch).length === 0 && (
                  <div className="empty-state">
                    <p>No assessment bookings for this branch yet.</p>
                  </div>
                )}
              </div>
            </div>
          )}



          {currentView === 'payments' && (
            <div id="payments-view" className="patient-list-container active">
              <div className="list-header">
                <h2>💳 Payment Information</h2>
                <div className="help-text">
                  <div className="help-item">
                    <span className="help-icon">💰</span>
                    <span>Verify and manage patient payment confirmations</span>
                  </div>
                </div>
              </div>

              <div className="table-wrapper table-wrapper-enhanced">
                <table className="patients-table">
                  <thead>
                    <tr>
                      <th className="col-patient">Patient Info</th>
                      <th className="col-payment">Payment Details</th>
                      <th className="col-status">Payment Status</th>
                      <th className="col-actions">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.assessments
                      .filter(patient => patient.branchLocation === selectedBranch)
                      .map((patient, index) => {
                        const originalIndex = patients.assessments.findIndex(p => p === patient);
                        const isVerified = patient.paymentStatus === 'verified';
                        const hasPaymentInfo = patient.paymentReference || patient.accountName;
                        
                        return (
                          <tr key={index} className={isVerified ? 'verified-payment' : hasPaymentInfo ? 'pending-payment' : 'no-payment'}>
                            <td>
                              <div className="patient-info">
                                <strong>{patient.guardianName}</strong><br />
                                Child: {patient.childName}<br />
                                <small>{patient.guardianPhone}</small>
                              </div>
                            </td>
                            <td>
                              <div className="payment-details">
                                {hasPaymentInfo ? (
                                  <>
                                    <div className="payment-method-badge">
                                      {patient.paymentMethod === 'gcash' ? (
                                        <span className="method-badge gcash">💳 GCash</span>
                                      ) : patient.paymentMethod === 'bank-transfer' ? (
                                        <span className="method-badge bank">🏦 Bank Transfer</span>
                                      ) : (
                                        <span className="method-badge unknown">❓ Unknown</span>
                                      )}
                                    </div>
                                    <strong>Amount:</strong> ₱{patient.paymentAmount ? patient.paymentAmount.toLocaleString() : '2,000'}<br />
                                    <strong>Reference:</strong> {patient.paymentReference || 'N/A'}<br />
                                    <strong>Account:</strong> {patient.accountName || 'N/A'}<br />
                                    <strong>Date:</strong> {patient.paymentDate || 'N/A'}
                                  </>
                                ) : (
                                  <span className="no-payment-info">No payment information provided</span>
                                )}
                              </div>
                            </td>
                            <td>
                              <div className="payment-status">
                                {isVerified ? (
                                  <span className="payment-badge verified">✅ Verified</span>
                                ) : hasPaymentInfo ? (
                                  <span className="payment-badge pending">⏳ Pending Verification</span>
                                ) : (
                                  <span className="payment-badge no-payment">❌ No Payment</span>
                                )}
                                {isVerified && patient.verifiedAt && (
                                  <div className="verified-date">
                                    Verified: {new Date(patient.verifiedAt).toLocaleDateString()}
                                  </div>
                                )}
                              </div>
                            </td>
                            <td>
                              <div className="action-buttons">
                                <button 
                                  className="btn-action view-details" 
                                  onClick={() => viewBookingDetails(patient)}
                                  title="View full details"
                                >
                                  <i className="fas fa-eye"></i>
                                </button>
                                {hasPaymentInfo && !isVerified && (
                                  <button 
                                    className="btn-action verify-payment" 
                                    onClick={() => verifyPayment(originalIndex)}
                                    title="Verify payment"
                                  >
                                    <i className="fas fa-check-circle"></i>
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                
                {patients.assessments.filter(p => p.branchLocation === selectedBranch).length === 0 && (
                  <div className="empty-state">
                    <p>No payment information available for this branch.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Booking Details Modal */}
      {isBookingDetailsOpen && selectedBooking && (
        <div className="booking-details-modal" style={{ display: 'block' }}>
          <div className="booking-details-content">
            <div className="booking-details-header">
              <h2>📋 Booking Details</h2>
              <span className="close-booking-details" onClick={closeBookingDetails}>&times;</span>
            </div>
            
            <div className="booking-details-body">
              <div className="booking-details-grid">
                {/* Branch Information */}
                <div className="detail-section">
                  <h3>📍 Branch Information</h3>
                  <div className="detail-item">
                    <strong>Branch:</strong> {selectedBooking.branchLocation === 'blumentritt' ? 'Main Branch (Blumentritt)' : 'Satellite Branch (Del Rosario)'}
                  </div>
                </div>

                {/* Guardian Information */}
                <div className="detail-section">
                  <h3>👤 Guardian Information</h3>
                  <div className="detail-item">
                    <strong>Name:</strong> {selectedBooking.guardianName}
                  </div>
                  <div className="detail-item">
                    <strong>Relationship:</strong> {selectedBooking.guardianRelation === 'Other' ? selectedBooking.otherRelationship : selectedBooking.guardianRelation}
                  </div>
                  <div className="detail-item">
                    <strong>Phone:</strong> {selectedBooking.guardianPhone}
                  </div>
                  <div className="detail-item">
                    <strong>Email:</strong> {selectedBooking.guardianEmail}
                  </div>
                </div>

                {/* Child Information */}
                <div className="detail-section">
                  <h3>👶 Child Information</h3>
                  <div className="detail-item">
                    <strong>Name:</strong> {selectedBooking.childName}
                  </div>
                  <div className="detail-item">
                    <strong>Birthday:</strong> {selectedBooking.childBirthday}
                  </div>
                  <div className="detail-item">
                    <strong>Age:</strong> {selectedBooking.childAge}
                  </div>
                </div>

                {/* Appointment Information */}
                <div className="detail-section">
                  <h3>📅 Appointment Information</h3>
                  <div className="detail-item">
                    <strong>Date:</strong> {selectedBooking.appointmentDate}
                  </div>
                  <div className="detail-item">
                    <strong>Time:</strong> {selectedBooking.selectedTime}
                  </div>
                  <div className="detail-item">
                    <strong>Professional:</strong> {
                      selectedBooking.selectedProfessional === 'developmental-pediatrician' ? '👶 Developmental Pediatrician' :
                      selectedBooking.selectedProfessional === 'occupational-therapist' ? '🖐️ Occupational Therapist' :
                      selectedBooking.selectedProfessional === 'speech-language-pathologist' ? '🗣️ Speech and Language Pathologist' :
                      selectedBooking.selectedProfessional
                    }
                  </div>
                </div>

                {/* Payment Information */}
                <div className="detail-section">
                  <h3>💳 Payment Information</h3>
                  <div className="detail-item">
                    <strong>Payment Method:</strong> 
                    <div className="payment-method-display">
                      {selectedBooking.paymentMethod === 'gcash' ? (
                        <span className="method-badge gcash large">💳 GCash</span>
                      ) : selectedBooking.paymentMethod === 'bank-transfer' ? (
                        <span className="method-badge bank large">🏦 Bank Transfer</span>
                      ) : (
                        <span className="method-badge unknown large">❓ {selectedBooking.paymentMethod || 'Not specified'}</span>
                      )}
                    </div>
                  </div>
                  <div className="detail-item">
                    <strong>Amount:</strong> <span className="amount-display">₱{selectedBooking.paymentAmount ? selectedBooking.paymentAmount.toLocaleString() : '2,000.00'}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Reference Number:</strong> <span className="reference-display">{selectedBooking.paymentReference || 'Not provided'}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Account Name:</strong> <span className="account-display">{selectedBooking.accountName || 'Not provided'}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Payment Date:</strong> <span className="date-display">{selectedBooking.paymentDate || 'Not provided'}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Payment Status:</strong> 
                    <span className={`payment-status-badge ${selectedBooking.paymentStatus === 'pending-verification' ? 'pending' : 'verified'}`}>
                      {selectedBooking.paymentStatus === 'pending-verification' ? '⏳ Pending Verification' : '✅ Verified'}
                    </span>
                    {selectedBooking.paymentStatus === 'verified' && selectedBooking.verifiedAt && (
                      <div className="verified-date">
                        Verified: {new Date(selectedBooking.verifiedAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Information */}
                <div className="detail-section">
                  <h3>📊 Status Information</h3>
                  <div className="detail-item">
                    <strong>Status:</strong> 
                    <span className={`status-badge ${selectedBooking.status === 'completed' ? 'completed' : 'pending'}`}>
                      {selectedBooking.status === 'completed' ? '✅ Completed' : '⏳ Pending'}
                    </span>
                  </div>
                  {selectedBooking.completedAt && (
                    <div className="detail-item">
                      <strong>Completed:</strong> {new Date(selectedBooking.completedAt).toLocaleString()}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="booking-details-actions">
                {selectedBooking.paymentStatus !== 'verified' && (selectedBooking.paymentReference || selectedBooking.accountName) && (
                  <button 
                    className="btn-verify-payment" 
                    onClick={() => verifyPayment(patients.assessments.findIndex(b => b === selectedBooking))}
                  >
                    <i className="fas fa-check-circle"></i> Verify Payment
                  </button>
                )}
                {selectedBooking.status !== 'completed' && (
                  <button 
                    className="btn-mark-done" 
                    onClick={() => markBookingDone(patients.assessments.findIndex(b => b === selectedBooking))}
                  >
                    <i className="fas fa-check"></i> Mark as Done
                  </button>
                )}
                <button className="btn-close-details" onClick={closeBookingDetails}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboard; 