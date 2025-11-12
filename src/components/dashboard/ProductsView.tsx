import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { mockProducts } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';
import ProductForm from '@/components/forms/ProductForm';

const ProductsView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);

  const filteredProducts = mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock':
        return 'bg-green-100 text-green-700';
      case 'low-stock':
        return 'bg-yellow-100 text-yellow-700';
      case 'out-of-stock':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <>
      <div className="space-y-4 sm:space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-xl"
            />
          </div>
          <Button onClick={() => setShowForm(true)} className="rounded-2xl whitespace-nowrap">
            <Plus className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Add Product</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>

        {/* Products Table - Desktop */}
        <div className="hidden md:block bg-card shadow-soft rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-sm text-muted-foreground">ID</th>
                  <th className="text-left py-4 px-6 font-semibold text-sm text-muted-foreground">Product Name</th>
                  <th className="text-left py-4 px-6 font-semibold text-sm text-muted-foreground">Category</th>
                  <th className="text-left py-4 px-6 font-semibold text-sm text-muted-foreground">Stock</th>
                  <th className="text-left py-4 px-6 font-semibold text-sm text-muted-foreground">Price</th>
                  <th className="text-left py-4 px-6 font-semibold text-sm text-muted-foreground">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-sm text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                    <td className="py-4 px-6 text-sm font-medium">{product.id}</td>
                    <td className="py-4 px-6 font-medium">{product.name}</td>
                    <td className="py-4 px-6 text-muted-foreground">{product.category}</td>
                    <td className="py-4 px-6">{product.stock}</td>
                    <td className="py-4 px-6">${product.price.toFixed(2)}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <Button variant="ghost" size="sm" className="rounded-lg">
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Products Cards - Mobile */}
        <div className="md:hidden space-y-3">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-card shadow-soft rounded-xl p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                </div>
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                  {product.status}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs">Stock</p>
                  <p className="font-medium">{product.stock}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Price</p>
                  <p className="font-medium">${product.price.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">ID</p>
                  <p className="font-medium text-xs">{product.id}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full rounded-lg">
                Edit
              </Button>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-card shadow-soft rounded-2xl p-4 sm:p-6">
            <div className="text-xs sm:text-sm text-muted-foreground mb-1">Total Products</div>
            <div className="text-2xl sm:text-3xl font-bold">{mockProducts.length}</div>
          </div>
          <div className="bg-card shadow-soft rounded-2xl p-4 sm:p-6">
            <div className="text-xs sm:text-sm text-muted-foreground mb-1">Low Stock Items</div>
            <div className="text-2xl sm:text-3xl font-bold text-yellow-600">
              {mockProducts.filter((p) => p.status === 'low-stock').length}
            </div>
          </div>
          <div className="bg-card shadow-soft rounded-2xl p-4 sm:p-6">
            <div className="text-xs sm:text-sm text-muted-foreground mb-1">Out of Stock</div>
            <div className="text-2xl sm:text-3xl font-bold text-red-600">
              {mockProducts.filter((p) => p.status === 'out-of-stock').length}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showForm && <ProductForm onClose={() => setShowForm(false)} onSuccess={() => {}} />}
      </AnimatePresence>
    </>
  );
};

export default ProductsView;
