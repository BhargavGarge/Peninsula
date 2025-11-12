import { mockCustomers } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

const CustomersView = () => {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Customers Table - Desktop */}
      <div className="hidden md:block bg-card shadow-soft rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-sm text-muted-foreground">ID</th>
                <th className="text-left py-4 px-6 font-semibold text-sm text-muted-foreground">Name</th>
                <th className="text-left py-4 px-6 font-semibold text-sm text-muted-foreground">Email</th>
                <th className="text-left py-4 px-6 font-semibold text-sm text-muted-foreground">Orders</th>
                <th className="text-left py-4 px-6 font-semibold text-sm text-muted-foreground">Total Spent</th>
                <th className="text-left py-4 px-6 font-semibold text-sm text-muted-foreground">Joined</th>
                <th className="text-left py-4 px-6 font-semibold text-sm text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockCustomers.map((customer) => (
                <tr key={customer.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-6 text-sm font-medium">{customer.id}</td>
                  <td className="py-4 px-6 font-medium">{customer.name}</td>
                  <td className="py-4 px-6 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {customer.email}
                    </div>
                  </td>
                  <td className="py-4 px-6">{customer.orders}</td>
                  <td className="py-4 px-6 font-medium">${customer.totalSpent.toFixed(2)}</td>
                  <td className="py-4 px-6 text-muted-foreground">{customer.joinedDate}</td>
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

      {/* Customers Cards - Mobile */}
      <div className="md:hidden space-y-3">
        {mockCustomers.map((customer) => (
          <div key={customer.id} className="bg-card shadow-soft rounded-xl p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{customer.name}</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <Mail className="w-3 h-3" />
                  {customer.email}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div>
                <p className="text-muted-foreground text-xs">Orders</p>
                <p className="font-medium">{customer.orders}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Spent</p>
                <p className="font-medium">${customer.totalSpent.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Joined</p>
                <p className="font-medium text-xs">{customer.joinedDate}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full rounded-lg">
              View Details
            </Button>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-card shadow-soft rounded-2xl p-4 sm:p-6">
          <div className="text-xs sm:text-sm text-muted-foreground mb-1">Total Customers</div>
          <div className="text-2xl sm:text-3xl font-bold">{mockCustomers.length}</div>
        </div>
        <div className="bg-card shadow-soft rounded-2xl p-4 sm:p-6">
          <div className="text-xs sm:text-sm text-muted-foreground mb-1">Avg. Orders per Customer</div>
          <div className="text-2xl sm:text-3xl font-bold">
            {(mockCustomers.reduce((sum, c) => sum + c.orders, 0) / mockCustomers.length).toFixed(1)}
          </div>
        </div>
        <div className="bg-card shadow-soft rounded-2xl p-4 sm:p-6">
          <div className="text-xs sm:text-sm text-muted-foreground mb-1">Total Customer Value</div>
          <div className="text-2xl sm:text-3xl font-bold text-green-600">
            ${mockCustomers.reduce((sum, c) => sum + c.totalSpent, 0).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomersView;
