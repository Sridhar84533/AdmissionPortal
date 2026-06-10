import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { CreditCard, CheckCircle2, Download, ExternalLink, ShieldCheck, X } from 'lucide-react';
import { API_BASE } from '../config';

export default function Payments() {
  const { token } = useAuth();
  const [appData, setAppData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('Razorpay');
  const [processing, setProcessing] = useState(false);
  const [successInfo, setSuccessInfo] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' });

  const fetchApp = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/application`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const app = await res.json();
        setAppData(app);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchApp();
  }, [token]);

  const handlePayClick = () => {
    setShowModal(true);
  };

  const handleSimulatePayment = async () => {
    setProcessing(true);
    setMessage({ text: '', type: '' });
    try {
      const res = await fetch(`${API_BASE}/api/payments/pay`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          applicationNumber: appData.applicationNumber,
          paymentMethod: selectedMethod,
          amount: appData.feeAmount || 1500
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Payment simulation failed');

      setSuccessInfo(data);
      fetchApp();
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    } finally {
      setProcessing(false);
    }
  };

  const handleDownloadReceipt = () => {
    if (!appData) return;
    const url = `${API_BASE}/api/payments/receipt/${appData.applicationNumber}`;
    // Create temporary link to force file download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Receipt_${appData.applicationNumber}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading payment invoice...</div>;
  }

  const methods = ['Razorpay', 'UPI', 'Net Banking', 'Credit Card', 'Debit Card'];

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {message.text && (
        <div style={{
          backgroundColor: 'rgba(239, 68, 68, 0.08)',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          color: 'var(--color-rejected)',
          padding: '0.75rem 1rem',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.9rem',
          fontWeight: 600
        }}>
          {message.text}
        </div>
      )}

      {/* Invoice Details Table */}
      <div className="table-container animate-fade-in">
        <table className="app-table">
          <thead>
            <tr>
              <th>Application No</th>
              <th>Date</th>
              <th>Programme Stream</th>
              <th>Amount</th>
              <th>Payment Status</th>
              <th>Receipt</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontWeight: 700 }}>{appData?.applicationNumber || 'N/A'}</td>
              <td>{appData?.createdAt ? new Date(appData.createdAt).toLocaleDateString() : 'N/A'}</td>
              <td>{appData?.programmeStream || 'Not Selected'}</td>
              <td style={{ fontFamily: 'Outfit', fontWeight: 700 }}>₹{appData?.feeAmount || 1500}</td>
              <td>
                <span className={`badge ${appData?.paymentStatus === 'Paid' ? 'badge-verified' : 'badge-draft'}`}>
                  {appData?.paymentStatus || 'Pending'}
                </span>
              </td>
              <td>
                {appData?.paymentStatus === 'Paid' ? (
                  <button 
                    onClick={handleDownloadReceipt}
                    className="btn btn-secondary" 
                    style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', display: 'flex', gap: '0.25rem' }}
                  >
                    <Download size={14} />
                    PDF
                  </button>
                ) : (
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Unavailable</span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {appData?.paymentStatus !== 'Paid' ? (
        <div className="form-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center', textAlign: 'center', padding: '3rem 2rem' }}>
          <CreditCard size={48} style={{ color: 'var(--primary)' }} />
          <div>
            <h3 style={{ fontFamily: 'Outfit', fontSize: '1.25rem', fontWeight: 800 }}>Complete Your Registration Payment</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem', maxWidth: '400px' }}>
              To submit your application for review, please make the non-refundable fee payment of ₹1500.
            </p>
          </div>
          <button 
            onClick={handlePayClick}
            className="btn btn-primary"
            disabled={!appData?.programmeStream}
            style={{ padding: '0.85rem 2.5rem' }}
          >
            Pay Application Fee
          </button>
          {!appData?.programmeStream && (
            <p style={{ fontSize: '0.8rem', color: 'var(--color-rejected)', fontWeight: 600 }}>
              * You must select a programme stream under the "Apply Programme" tab first.
            </p>
          )}
        </div>
      ) : (
        <div className="form-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center', textAlign: 'center', padding: '3rem 2rem' }}>
          <CheckCircle2 size={48} style={{ color: 'var(--color-verified)' }} />
          <div>
            <h3 style={{ fontFamily: 'Outfit', fontSize: '1.25rem', fontWeight: 800 }}>Payment Successful!</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
              Your application fee has been paid. Transaction ID: <strong>{appData.paymentDetails?.transactionId}</strong>
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={handleDownloadReceipt} className="btn btn-primary">
              <Download size={18} />
              Download Receipt PDF
            </button>
          </div>
        </div>
      )}

      {/* Simulated Checkout Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={20} style={{ color: 'var(--primary)' }} />
                Secure Checkout Portal
              </h3>
              <button className="modal-close" onClick={() => { setShowModal(false); setSuccessInfo(null); }} disabled={processing}>
                <X size={20} />
              </button>
            </div>
            
            <div className="modal-body">
              {!successInfo ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
                    <span style={{ fontWeight: 600 }}>Amount Due:</span>
                    <span style={{ fontWeight: 800, fontFamily: 'Outfit' }}>INR 1,500.00</span>
                  </div>

                  <div>
                    <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                      Choose Payment Method:
                    </p>
                    <div className="payment-methods-grid">
                      {methods.map((m, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className={`payment-method-btn ${selectedMethod === m ? 'selected' : ''}`}
                          onClick={() => setSelectedMethod(m)}
                          disabled={processing}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                    By clicking pay, you will mock a production gateway response with instant confirmation.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '1rem 0' }}>
                  <CheckCircle2 size={40} style={{ color: 'var(--color-verified)' }} />
                  <div style={{ textAlign: 'center' }}>
                    <h4 style={{ fontWeight: 800, fontSize: '1.1rem' }}>Transaction Approved</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                      Payment successful through method: <strong>{selectedMethod}</strong>
                    </p>
                  </div>
                  <div style={{ width: '100%', backgroundColor: 'var(--bg-app)', padding: '1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span>Transaction ID:</span>
                      <strong style={{ fontFamily: 'Outfit' }}>{successInfo.transactionId}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Timestamp:</span>
                      <strong>{new Date(successInfo.paymentDetails?.paidAt).toLocaleTimeString()}</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="modal-footer">
              {!successInfo ? (
                <>
                  <button className="btn btn-secondary" onClick={() => setShowModal(false)} disabled={processing}>
                    Cancel
                  </button>
                  <button className="btn btn-primary" onClick={handleSimulatePayment} disabled={processing}>
                    {processing ? 'Processing...' : 'Pay INR 1500'}
                  </button>
                </>
              ) : (
                <button 
                  className="btn btn-primary" 
                  onClick={() => { 
                    setShowModal(false); 
                    setSuccessInfo(null); 
                    handleDownloadReceipt();
                  }}
                >
                  Download Receipt & Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
