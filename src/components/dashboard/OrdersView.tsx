import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { mockOrders } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import OrderForm from '@/components/forms/OrderForm';

const OrdersView = () => {
  const [showForm, setShowForm] = useState(false);
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'shipped':
        return 'bg-blue-100 text-blue-700';
      case 'processing':
        return 'bg-yellow-100 text-yellow-700';
      case 'pending':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <>
      <div className="space-y-4 sm:space-y-6">
        {/* Add Order Button */}
        <div className="flex justify-end">
          <Button onClick={() => setShowForm(true)} className="rounded-2xl">
            <Plus className="w-4 h-4 mr-2" />
            Create Order
          </Button>
        </div>

        {/* Orders Table - Desktop */}
        <div className="hidden md:block bg-card shadow-soft rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-sm text-muted-foreground">Order ID</th>
                <th className="text-left py-4 px-6 font-semibold text-sm text-muted-foreground">Customer</th>
                <th className="text-left py-4 px-6 font-semibold text-sm text-muted-foreground">Date</th>
                <th className="text-left py-4 px-6 font-semibold text-sm text-muted-foreground">Items</th>
                <th className="text-left py-4 px-6 font-semibold text-sm text-muted-foreground">Total</th>
                <th className="text-left py-4 px-6 font-semibold text-sm text-muted-foreground">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-sm text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map((order) => (
                <tr key={order.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-6 text-sm font-medium">{order.id}</td>
                  <td className="py-4 px-6 font-medium">{order.customer}</td>
                  <td className="py-4 px-6 text-muted-foreground">{order.date}</td>
                  <td className="py-4 px-6">{order.items}</td>
                  <td className="py-4 px-6 font-medium">${order.total.toFixed(2)}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <Button variant="ghost" size="sm" className="rounded-lg">
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>

        {/* Orders Cards - Mobile */}
        <div className="md:hidden space-y-3">
          {mockOrders.map((order) => (
            <div key={order.id} className="bg-card shadow-soft rounded-xl p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-sm">{order.id}</h3>
                  <p className="text-sm text-muted-foreground">{order.customer}</p>
                </div>
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs">Items</p>
                  <p className="font-medium">{order.items}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Total</p>
                  <p className="font-medium">${order.total.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Date</p>
                  <p className="font-medium text-xs">{order.date}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full rounded-lg">
                View Details
              </Button>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-card shadow-soft rounded-2xl p-4 sm:p-6">
            <div className="text-xs sm:text-sm text-muted-foreground mb-1">Total Orders</div>
            <div className="text-2xl sm:text-3xl font-bold">{mockOrders.length}</div>
          </div>
          <div className="bg-card shadow-soft rounded-2xl p-4 sm:p-6">
            <div className="text-xs sm:text-sm text-muted-foreground mb-1">Pending</div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-600">
              {mockOrders.filter((o) => o.status === 'pending').length}
            </div>
          </div>
          <div className="bg-card shadow-soft rounded-2xl p-4 sm:p-6">
            <div className="text-xs sm:text-sm text-muted-foreground mb-1">Processing</div>
            <div className="text-2xl sm:text-3xl font-bold text-yellow-600">
              {mockOrders.filter((o) => o.status === 'processing').length}
            </div>
          </div>
          <div className="bg-card shadow-soft rounded-2xl p-4 sm:p-6">
            <div className="text-xs sm:text-sm text-muted-foreground mb-1">Total Revenue</div>
            <div className="text-2xl sm:text-3xl font-bold text-green-600">
              ${mockOrders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showForm && <OrderForm onClose={() => setShowForm(false)} onSuccess={() => {}} />}
      </AnimatePresence>
    </>
  );
};

export default OrdersView;
