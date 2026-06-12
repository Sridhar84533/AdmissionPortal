import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { MessageSquare, Paperclip, Send, User, ShieldCheck } from 'lucide-react';
import { API_BASE } from '../config';

export default function SupportFeedback() {
  const { token, user } = useAuth();
  const [appNumber, setAppNumber] = useState('');
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  
  // New ticket state
  const [category, setCategory] = useState('Admission Query');
  const [msgText, setMsgText] = useState('');
  const [file, setFile] = useState(null);
  
  // Reply inputs state (keyed by ticket ID)
  const [replies, setReplies] = useState({});

  const fetchTickets = async () => {
    try {
      const endpoint = user.role === 'admin' ? '/api/admin/support/tickets' : '/api/support';
      const res = await fetch(`${API_BASE}${endpoint}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setTickets(data);
      }

      if (user.role === 'applicant') {
        const appRes = await fetch(`${API_BASE}/api/application`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (appRes.ok) {
          const app = await appRes.json();
          setAppNumber(app.applicationNumber);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchTickets();
  }, [token, user]);

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    if (!msgText) return;

    setSubmitting(true);
    setMessage({ text: '', type: '' });

    const formData = new FormData();
    formData.append('category', category);
    formData.append('message', msgText);
    formData.append('applicationNumber', appNumber);
    if (file) formData.append('file', file);

    try {
      const res = await fetch(`${API_BASE}/api/support/create`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to submit ticket');

      setMessage({ text: 'Support ticket submitted successfully!', type: 'success' });
      setMsgText('');
      setFile(null);
      fetchTickets();
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleReplySubmit = async (e, ticketId) => {
    e.preventDefault();
    const replyText = replies[ticketId];
    if (!replyText) return;

    try {
      const res = await fetch(`${API_BASE}/api/support/reply/${ticketId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message: replyText })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Reply failed');

      setReplies(prev => ({ ...prev, [ticketId]: '' }));
      fetchTickets();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleReplyChange = (ticketId, value) => {
    setReplies(prev => ({ ...prev, [ticketId]: value }));
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading support tickets...</div>;
  }

  const categories = ['Admission Query', 'Payment Issue', 'Document Issue', 'Technical Issue', 'Interview Query'];

  return (
    <div className={`support-grid ${user.role === 'admin' ? 'admin' : ''}`}>
      
      {/* Ticket Creation - Applicants Only */}
      {user.role === 'applicant' && (
        <div className="form-card" style={{ height: 'fit-content' }}>
          <h3 className="form-section-title">
            <MessageSquare size={20} />
            Submit Query Ticket
          </h3>
          
          {message.text && (
            <div style={{
              backgroundColor: message.type === 'success' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)',
              border: `1px solid ${message.type === 'success' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
              color: message.type === 'success' ? 'var(--color-verified)' : 'var(--color-rejected)',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '1rem',
              fontSize: '0.85rem'
            }}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleCreateTicket} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="form-group">
              <label>Application Number</label>
              <input 
                type="text" className="form-control" 
                value={appNumber} readOnly disabled
              />
            </div>

            <div className="form-group">
              <label>Category *</label>
              <select 
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Message *</label>
              <textarea 
                className="form-control" rows="4" required
                placeholder="Describe your query or issue in detail..."
                value={msgText}
                onChange={(e) => setMsgText(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Attach File (optional)</label>
              <input 
                type="file" 
                id="ticket-file"
                style={{ display: 'none' }}
                onChange={(e) => setFile(e.target.files[0])}
                accept=".pdf,.jpg,.png"
              />
              <label 
                htmlFor="ticket-file"
                className="btn btn-secondary"
                style={{
                  width: 'fit-content',
                  padding: '0.5rem 1rem',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  display: 'flex',
                  gap: '0.5rem'
                }}
              >
                <Paperclip size={14} />
                {file ? file.name : 'Choose File'}
              </label>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={submitting}
              style={{ marginTop: '0.5rem' }}
            >
              Submit Ticket
            </button>
          </form>
        </div>
      )}

      {/* Tickets List Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h3 className="form-section-title" style={{ border: 'none', marginBottom: 0 }}>
          {user.role === 'admin' ? 'Support Desk Queries' : 'Your History & Threads'}
        </h3>

        {tickets.length === 0 ? (
          <div className="form-card" style={{ textAlign: 'center', padding: '3rem 2rem', color: 'var(--text-muted)' }}>
            <MessageSquare size={36} style={{ marginBottom: '1rem', color: 'var(--text-muted)' }} />
            <p>No queries found. Submit a ticket on the left if you need help.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {tickets.map((ticket, idx) => (
              <div key={idx} className="form-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
                  <div>
                    <span className="badge badge-submitted" style={{ marginRight: '0.5rem', fontSize: '0.75rem' }}>
                      {ticket.category}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      App No: {ticket.applicationNumber || 'N/A'}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Original Query Message */}
                <div style={{ backgroundColor: 'var(--bg-app)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                  <p style={{ fontSize: '0.95rem', fontWeight: 600 }}>
                    {user.role === 'admin' ? `Applicant (${ticket.userId?.name}):` : 'My Query:'}
                  </p>
                  <p style={{ fontSize: '0.9rem', marginTop: '0.25rem', color: 'var(--text-muted)' }}>{ticket.message}</p>
                  {ticket.attachment && (
                    <a href={`${API_BASE}${ticket.attachment}`} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', color: 'var(--primary)', marginTop: '0.5rem', fontWeight: 600 }}>
                      <Paperclip size={12} />
                      View Attachment
                    </a>
                  )}
                </div>

                {/* Replies Thread */}
                {ticket.replies && ticket.replies.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '1rem', borderLeft: '2px solid var(--border)' }}>
                    {ticket.replies.map((reply, rIdx) => (
                      <div key={rIdx} style={{ fontSize: '0.85rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 700, color: reply.sender === 'admin' ? 'var(--primary)' : 'var(--text-main)' }}>
                          {reply.sender === 'admin' ? <ShieldCheck size={14} /> : <User size={14} />}
                          <span>{reply.sender === 'admin' ? 'Admission Admin' : 'Applicant'}</span>
                        </div>
                        <p style={{ color: 'var(--text-muted)', marginTop: '0.15rem' }}>{reply.message}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reply Form */}
                <form onSubmit={(e) => handleReplySubmit(e, ticket._id || ticket.id)} style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <input 
                    type="text" 
                    className="form-control"
                    placeholder="Write a reply..."
                    style={{ flexGrow: 1 }}
                    value={replies[ticket._id || ticket.id] || ''}
                    onChange={(e) => handleReplyChange(ticket._id || ticket.id, e.target.value)}
                    required
                  />
                  <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
                    <Send size={14} />
                  </button>
                </form>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
