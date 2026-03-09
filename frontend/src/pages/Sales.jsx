import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { getSales, createSale, updateSale, deleteSale } from '../services/salesService';
import SalesTable from '../components/sales/SalesTable';
import AddSaleModal from '../components/sales/AddSaleModal';
import EditSaleModal from '../components/sales/EditSaleModal';
import DeleteConfirmation from '../components/sales/DeleteConfirmation';
import AuthContext from '../context/AuthContext';

const Sales = () => {
    const { isDarkMode, accentColor } = React.useContext(AuthContext);
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Modal States
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    // Selected data
    const [selectedSale, setSelectedSale] = useState(null);

    const fetchSales = async () => {
        try {
            setLoading(true);
            const data = await getSales();
            setSales(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching sales:', err);
            setError('Failed to load sales data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSales();
    }, []);

    // Handlers
    const handleAddSave = async (data) => {
        try {
            await createSale(data);
            setIsAddOpen(false);
            fetchSales(); // Refresh table
        } catch (err) {
            console.error('Error adding sale:', err);
            alert('Failed to add sale. Check console for details.');
        }
    };

    const handleEditSave = async (id, data) => {
        try {
            await updateSale(id, data);
            setIsEditOpen(false);
            fetchSales(); // Refresh table
        } catch (err) {
            console.error('Error updating sale:', err);
            alert('Failed to update sale.');
        }
    };

    const handleDeleteConfirm = async () => {
        if (!selectedSale) return;
        try {
            await deleteSale(selectedSale.id);
            setIsDeleteOpen(false);
            fetchSales(); // Refresh table
        } catch (err) {
            console.error('Error deleting sale:', err);
            alert('Failed to delete sale.');
        }
    };

    const openEdit = (sale) => {
        setSelectedSale(sale);
        setIsEditOpen(true);
    };

    const openDelete = (sale) => {
        setSelectedSale(sale);
        setIsDeleteOpen(true);
    };

    if (loading && sales.length === 0) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px', color: '#64748b', fontSize: '16px', fontFamily: "'Inter', sans-serif" }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ width: '40px', height: '40px', border: `3px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`, borderTop: `3px solid ${accentColor}`, borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }}></div>
                    Loading Sales...
                </div>
            </div>
        );
    }

    return (
        <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                <div>
                    <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>Sales Management</h2>
                    <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#64748b' }}>Manage your product sales, categories, and revenue.</p>
                </div>
                <button
                    onClick={() => setIsAddOpen(true)}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px',
                        borderRadius: '8px', backgroundColor: accentColor, color: 'white',
                        border: 'none', fontSize: '14px', fontWeight: '600', cursor: 'pointer',
                        boxShadow: `0 4px 6px -1px ${accentColor}33`,
                        transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    <Plus size={18} />
                    Add New Sale
                </button>
            </div>

            {error && (
                <div style={{ padding: '12px 16px', backgroundColor: '#fef2f2', borderLeft: '4px solid #ef4444', color: '#b91c1c', marginBottom: '24px', borderRadius: '4px', fontSize: '14px' }}>
                    {error}
                </div>
            )}

            <SalesTable
                sales={sales}
                onEdit={openEdit}
                onDelete={openDelete}
            />

            <AddSaleModal
                isOpen={isAddOpen}
                onClose={() => setIsAddOpen(false)}
                onSave={handleAddSave}
            />

            <EditSaleModal
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                onSave={handleEditSave}
                saleData={selectedSale}
            />

            <DeleteConfirmation
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={handleDeleteConfirm}
                itemName={selectedSale ? `${selectedSale.product_name} (₹${selectedSale.price * selectedSale.quantity})` : ''}
            />
        </div>
    );
};

export default Sales;
