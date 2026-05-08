import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createProduct, getProductById, updateProduct } from '../services/api';
import type { ProductFormData } from '../types/product';
import { ArrowLeft, Save, Package, AlignLeft, DollarSign, Layers, Tag, Loader2, AlertCircle } from 'lucide-react';

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
    isActive: true,
  });
  
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditMode && id) {
      getProductById(id)
        .then((data) => {
          setFormData({
            name: data.name,
            description: data.description,
            price: data.price,
            stock: data.stock,
            category: data.category,
            isActive: data.isActive,
          });
        })
        .catch(() => setError('Failed to load product data'))
        .finally(() => setLoading(false));
    }
  }, [id, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (name === 'price' || name === 'stock') {
      const onlyNumbers = value.replace(/[^0-9]/g, '');
      
      const cleanValue = onlyNumbers.length > 1 && onlyNumbers.startsWith('0') 
        ? onlyNumbers.replace(/^0+/, '') 
        : onlyNumbers;

      setFormData(prev => ({ 
        ...prev, 
        [name]: cleanValue === '' ? 0 : Number(cleanValue) 
      }));
      return;
    }

    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (isEditMode && id) {
        await updateProduct(id, formData);
      } else {
        await createProduct(formData);
      }
      navigate('/');
    } catch (err) {
      setError('Failed to save product');
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 text-gray-500">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-4" />
      <p className="text-sm font-medium animate-pulse">Loading product details...</p>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto">
      <button 
        onClick={() => navigate('/')} 
        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Inventory
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-200 bg-white flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{isEditMode ? 'Edit Product' : 'Add New Product'}</h2>
            <p className="text-sm text-gray-500 mt-1">{isEditMode ? 'Update the details of your existing product.' : 'Fill in the information below to add a new product.'}</p>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-full hidden sm:block">
            <Package className="w-6 h-6" />
          </div>
        </div>

        {error && (
          <div className="mx-8 mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start text-red-600">
            <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Package className="h-5 w-5 text-gray-400" />
                </div>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Mechanical Keyboard Pro" className="block w-full pl-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors sm:text-sm text-gray-900 placeholder-gray-400" />
              </div>
            </div>
            
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <AlignLeft className="h-5 w-5 text-gray-400" />
                </div>
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Detail about the product..." rows={3} className="block w-full pl-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors sm:text-sm text-gray-900 placeholder-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Price (Rp)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                {/* Diubah jadi type="text" dan inputMode="numeric" biar panahnya ilang tapi tetep ngebuka numpad di HP */}
                <input required type="text" inputMode="numeric" name="price" value={formData.price === 0 && !isEditMode ? '' : formData.price} onChange={handleChange} placeholder="0" className="block w-full pl-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors sm:text-sm text-gray-900" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Stock Quantity</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Layers className="h-5 w-5 text-gray-400" />
                </div>
                <input required type="text" inputMode="numeric" name="stock" value={formData.stock === 0 && !isEditMode ? '' : formData.stock} onChange={handleChange} placeholder="0" className="block w-full pl-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors sm:text-sm text-gray-900" />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Tag className="h-5 w-5 text-gray-400" />
                </div>
                <input required type="text" name="category" value={formData.category} onChange={handleChange} placeholder="e.g. Electronics" className="block w-full pl-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors sm:text-sm text-gray-900 placeholder-gray-400" />
              </div>
            </div>
          </div>

          <div className="py-4 border-y border-gray-100">
            {/* Class relative-nya gw pindahin ke dalem div biar presisi */}
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              <div className="ml-3">
                <span className="block text-sm font-semibold text-gray-900">Visibility Status</span>
                <span className="block text-xs text-gray-500 mt-0.5">Allow this product to be seen by customers</span>
              </div>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => navigate('/')} className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500/20 transition-all">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/20 disabled:opacity-50 transition-all shadow-sm">
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {isEditMode ? 'Save Changes' : 'Create Product'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}