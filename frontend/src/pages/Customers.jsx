import React, { useState, useEffect } from 'react';
import { Plus, Users, Mail, Phone, MapPin, Edit2, Trash2, Search, X, Package, Clock, ExternalLink } from 'lucide-react';
import { getCustomers, createCustomer, deleteCustomer, getCustomerOrders } from '../services/customerService';
import AddCustomerModal from '../components/customers/AddCustomerModal';
import AuthContext from '../context/AuthContext';

const cardStyle = (isDarkMode) => ({
    backgroundColor: isDarkMode ? '#1e293b' : 'white',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: isDarkMode ? '0 4px 6px -1px rgba(0, 0, 0, 0.2)' : '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)',
    border: isDarkMode ? '1px solid #334155' : '1px solid #f1f5f9',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
});

const CustomerDetailsModal = ({ isOpen, onClose, customer, orders, loading, isDarkMode, accentColor }) => {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.6)' : 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
            padding: '20px'
        }}>
            <div style={{
                backgroundColor: isDarkMode ? '#1e293b' : 'white', borderRadius: '20px', width: '100%', maxWidth: '700px',
                maxHeight: '85vh', overflow: 'hidden', display: 'flex', flexDirection: 'column',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                border: isDarkMode ? '1px solid #334155' : 'none'
            }}>
                {/* Modal Header */}
                <div style={{ padding: '24px', borderBottom: isDarkMode ? '1px solid #334155' : '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: isDarkMode ? '#3b82f615' : '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Users size={24} color="#3b82f6" />
                        </div>
                        <div>
                            <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>{customer.name}</h3>
                            <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#64748b' }}>Customer Purchase History</p>
                        </div>
                    </div>
                    <button onClick={onClose} style={{ background: isDarkMode ? '#0f172a' : '#f8fafc', border: 'none', borderRadius: '10px', padding: '8px', cursor: 'pointer', color: '#64748b' }}>
                        <X size={20} />
                    </button>
                </div>

                <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                            <div style={{ width: '32px', height: '32px', border: `3px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`, borderTop: `3px solid ${accentColor}`, borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }}></div>
                            Loading order history...
                        </div>
                    ) : orders.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {orders.map((order) => (
                                <div key={order.id} style={{ border: isDarkMode ? '1px solid #334155' : '1px solid #f1f5f9', borderRadius: '16px', overflow: 'hidden' }}>
                                    <div style={{ backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ fontSize: '14px', fontWeight: '700', color: '#3b82f6' }}>Order #{order.id}</div>
                                            <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#cbd5e1' }}></div>
                                            <div style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <Clock size={12} /> {new Date(order.order_date).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <div style={{ fontSize: '14px', fontWeight: '700', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>
                                            ₹{Number(order.total_amount).toLocaleString()}
                                        </div>
                                    </div>
                                    <div style={{ padding: '16px' }}>
                                        {order.items.map((item, idx) => (
                                            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: idx === order.items.length - 1 ? 'none' : (isDarkMode ? '1px solid #334155' : '1px solid #f8fafc') }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: isDarkMode ? '#0f172a' : '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Package size={16} color="#94a3b8" />
                                                    </div>
                                                    <div>
                                                        <div style={{ fontSize: '13px', fontWeight: '600', color: isDarkMode ? '#cbd5e1' : '#1e293b' }}>{item.product_name}</div>
                                                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>Qty: {item.quantity} × ₹{Number(item.unit_price).toLocaleString()}</div>
                                                    </div>
                                                </div>
                                                <div style={{ fontSize: '13px', fontWeight: '600', color: isDarkMode ? '#f8fafc' : '#475569' }}>
                                                    ₹{Number(item.quantity * item.unit_price).toLocaleString()}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8' }}>
                            <div style={{ marginBottom: '16px' }}><Package size={48} strokeWidth={1.5} /></div>
                            <h4 style={{ margin: '0 0 8px', color: isDarkMode ? '#f1f5f9' : '#475569' }}>No orders found</h4>
                            <p style={{ margin: 0, fontSize: '14px' }}>This customer hasn't made any purchases yet.</p>
                        </div>
                    )}
                </div>

                {/* Modal Footer */}
                <div style={{ padding: '20px 24px', backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc', borderTop: isDarkMode ? '1px solid #334155' : '1px solid #f1f5f9', display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                        onClick={onClose}
                        style={{ padding: '10px 20px', borderRadius: '10px', border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0', backgroundColor: isDarkMode ? '#1e293b' : 'white', color: isDarkMode ? '#f1f5f9' : '#475569', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
                    >
                        Close Details
                    </button>
                </div>
            </div>
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

const Customers = () => {
    const { isDarkMode, accentColor } = React.useContext(AuthContext);
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Order history state
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [orders, setOrders] = useState([]);
    const [ordersLoading, setOrdersLoading] = useState(false);

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const data = await getCustomers();
            setCustomers(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Error fetching customers:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleViewDetails = async (customer) => {
        setSelectedCustomer(customer);
        setIsDetailsOpen(true);
        setOrdersLoading(true);
        const id = customer._id || customer.id;
        try {
            const data = await getCustomerOrders(id);
            setOrders(data);
        } catch (err) {
            console.error('Error fetching customer orders:', err);
            setOrders([]);
        } finally {
            setOrdersLoading(false);
        }
    };

    const handleAddCustomer = async (data) => {
        try {
            await createCustomer(data);
            fetchCustomers();
        } catch (err) {
            alert('Failed to add customer. Please try again.');
        }
    };

    const handleDeleteCustomer = async (e, id) => {
        e.stopPropagation(); // Prevent opening details
        if (window.confirm('Are you sure you want to delete this customer?')) {
            try {
                await deleteCustomer(id);
                fetchCustomers();
            } catch (err) {
                alert('Failed to delete customer.');
            }
        }
    };

    const filteredCustomers = customers.filter(c =>
        (c.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (c.email?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (loading) return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px', color: '#64748b', fontSize: '16px', fontFamily: "'Inter', sans-serif" }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{ width: '40px', height: '40px', border: `3px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`, borderTop: `3px solid ${accentColor}`, borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }}></div>
                Loading Customers...
            </div>
        </div>
    );

    return (
        <div style={{ fontFamily: "'Inter', sans-serif" }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                <div>
                    <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>Customer Management</h2>
                    <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#64748b' }}>Manage your client database and contact information.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px',
                        borderRadius: '8px', backgroundColor: accentColor, color: 'white',
                        border: 'none', fontSize: '14px', fontWeight: '600', cursor: 'pointer',
                        transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    <Plus size={18} />
                    Add Customer
                </button>
            </div>

            {/* Search Bar */}
            <div style={{ backgroundColor: isDarkMode ? '#1e293b' : 'white', borderRadius: '16px', padding: '16px', border: isDarkMode ? '1px solid #334155' : '1px solid #f1f5f9', marginBottom: '24px' }}>
                <div style={{ position: 'relative' }}>
                    <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%', padding: '10px 12px 10px 40px', borderRadius: '8px',
                            border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
                            backgroundColor: isDarkMode ? '#0f172a' : 'white',
                            color: isDarkMode ? '#f1f5f9' : '#1e293b',
                            outline: 'none', fontSize: '14px'
                        }}
                    />
                </div>
            </div>

            {/* Customers Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {filteredCustomers.map(customer => (
                    <div
                        key={customer._id || customer.id}
                        style={cardStyle(isDarkMode)}
                        onClick={() => handleViewDetails(customer)}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = accentColor;
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = isDarkMode ? `0 10px 15px -3px rgba(0, 0, 0, 0.4)` : '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = isDarkMode ? '#334155' : '#f1f5f9';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = isDarkMode ? '0 4px 6px -1px rgba(0, 0, 0, 0.2)' : '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)';
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: isDarkMode ? '#3b82f615' : '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Users size={24} color="#3b82f6" />
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button style={{ color: '#64748b', background: 'none', border: 'none', cursor: 'pointer' }} onClick={(e) => e.stopPropagation()}><Edit2 size={16} /></button>
                                <button
                                    onClick={(e) => handleDeleteCustomer(e, customer._id || customer.id)}
                                    style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                        <h3 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: '700', color: isDarkMode ? '#f8fafc' : '#1e293b' }}>{customer.name}</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '13px', marginBottom: '8px' }}>
                            <Mail size={14} /> {customer.email}
                        </div>
                        {customer.phone && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '13px', marginBottom: '8px' }}>
                                <Phone size={14} /> {customer.phone}
                            </div>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '16px', borderTop: isDarkMode ? '1px solid #334155' : '1px solid #f8fafc' }}>
                            <span style={{ fontSize: '11px', fontWeight: '600', color: accentColor, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                VIEW ORDER HISTORY <ExternalLink size={12} />
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {filteredCustomers.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                    No customers found.
                </div>
            )}

            <AddCustomerModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleAddCustomer}
            />

            {selectedCustomer && (
                <CustomerDetailsModal
                    isOpen={isDetailsOpen}
                    onClose={() => setIsDetailsOpen(false)}
                    customer={selectedCustomer}
                    orders={orders}
                    loading={ordersLoading}
                    isDarkMode={isDarkMode}
                    accentColor={accentColor}
                />
            )}
        </div>
    );
};

export default Customers;
