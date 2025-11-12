import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Search, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { mockCustomers, mockProducts } from '@/data/mockData';

interface OrderFormProps {
  onClose: () => void;
  onSuccess?: () => void;
}

interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

const OrderForm = ({ onClose, onSuccess }: OrderFormProps) => {
  const [phone, setPhone] = useState('');
  const [customer, setCustomer] = useState<any>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('1');

  useEffect(() => {
    if (phone.length === 10) {
      // Mock customer lookup by phone
      const foundCustomer = mockCustomers.find((c) => c.email.includes(phone.slice(0, 4)));
      if (foundCustomer) {
        setCustomer(foundCustomer);
        toast.success(`Customer found: ${foundCustomer.name}`);
      } else {
        setCustomer(null);
        toast.info('New customer - will be created with this order');
      }
    }
  }, [phone]);

  const handleAddItem = () => {
    if (!selectedProduct || !quantity) {
      toast.error('Please select a product and quantity');
      return;
    }

    const product = mockProducts.find((p) => p.id === selectedProduct);
    if (!product) return;

    const newItem: OrderItem = {
      productId: product.id,
      productName: product.name,
      quantity: parseInt(quantity),
      price: product.price,
    };

    setOrderItems([...orderItems, newItem]);
    setSelectedProduct('');
    setQuantity('1');
    toast.success('Item added to order');
  };

  const handleRemoveItem = (index: number) => {
    setOrderItems(orderItems.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    return orderItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone || phone.length !== 10) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }

    if (orderItems.length === 0) {
      toast.error('Please add at least one item to the order');
      return;
    }

    // Mock order creation
    toast.success('Order created successfully!');
    onSuccess?.();
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-card rounded-2xl shadow-medium w-full max-w-3xl max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-card border-b border-border p-4 sm:p-6 flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold">Create Order</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-xl">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6">
          {/* Customer Search */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Details</h3>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="Enter 10-digit phone"
                  className="rounded-xl pl-10"
                  maxLength={10}
                  required
                />
              </div>
              {phone.length === 10 && customer && (
                <div className="bg-accent rounded-xl p-3 text-sm">
                  <p className="font-medium">{customer.name}</p>
                  <p className="text-muted-foreground text-xs">{customer.email}</p>
                  <p className="text-muted-foreground text-xs">Total Orders: {customer.orders}</p>
                </div>
              )}
            </div>
          </div>

          {/* Add Items */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Order Items</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2 space-y-2">
                <Label htmlFor="product">Product</Label>
                <select
                  id="product"
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-input bg-background text-sm"
                >
                  <option value="">Select product</option>
                  {mockProducts.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} - ${product.price.toFixed(2)} ({product.stock} in stock)
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <div className="flex gap-2">
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="rounded-xl flex-1"
                  />
                  <Button type="button" onClick={handleAddItem} className="rounded-xl px-3">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Order Items List */}
            {orderItems.length > 0 && (
              <div className="bg-accent/50 rounded-xl p-4 space-y-2">
                {orderItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-background rounded-lg p-3"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.productName}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.quantity} x ${item.price.toFixed(2)} = ${(item.quantity * item.price).toFixed(2)}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveItem(index)}
                      className="rounded-lg"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                ))}

                <div className="pt-3 border-t border-border flex justify-between items-center">
                  <span className="font-semibold">Total:</span>
                  <span className="text-xl font-bold">${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-2xl flex-1">
              Cancel
            </Button>
            <Button type="submit" className="rounded-2xl flex-1">
              Create Order
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default OrderForm;
