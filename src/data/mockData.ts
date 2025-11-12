export interface Product {
  id: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

export interface Order {
  id: string;
  customer: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  total: number;
  items: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  orders: number;
  totalSpent: number;
  joinedDate: string;
}

export const mockProducts: Product[] = [
  { id: 'P001', name: 'Apples', category: 'Fruits', stock: 150, price: 3.99, status: 'in-stock' },
  { id: 'P002', name: 'Bananas', category: 'Fruits', stock: 8, price: 2.49, status: 'low-stock' },
  { id: 'P003', name: 'Carrots', category: 'Vegetables', stock: 0, price: 1.99, status: 'out-of-stock' },
  { id: 'P004', name: 'Dairy Milk', category: 'Dairy', stock: 45, price: 4.99, status: 'in-stock' },
  { id: 'P005', name: 'Eggs', category: 'Dairy', stock: 12, price: 5.49, status: 'low-stock' },
  { id: 'P006', name: 'Bread', category: 'Bakery', stock: 67, price: 3.49, status: 'in-stock' },
  { id: 'P007', name: 'Tomatoes', category: 'Vegetables', stock: 89, price: 4.29, status: 'in-stock' },
  { id: 'P008', name: 'Chicken Breast', category: 'Meat', stock: 24, price: 8.99, status: 'in-stock' },
];

export const mockOrders: Order[] = [
  { id: 'O001', customer: 'John Smith', date: '2025-11-10', status: 'delivered', total: 125.50, items: 8 },
  { id: 'O002', customer: 'Sarah Johnson', date: '2025-11-11', status: 'shipped', total: 89.99, items: 5 },
  { id: 'O003', customer: 'Michael Brown', date: '2025-11-11', status: 'processing', total: 234.75, items: 12 },
  { id: 'O004', customer: 'Emily Davis', date: '2025-11-12', status: 'pending', total: 45.20, items: 3 },
  { id: 'O005', customer: 'David Wilson', date: '2025-11-12', status: 'processing', total: 178.90, items: 9 },
];

export const mockCustomers: Customer[] = [
  { id: 'C001', name: 'John Smith', email: 'john@example.com', orders: 15, totalSpent: 1250.00, joinedDate: '2024-03-15' },
  { id: 'C002', name: 'Sarah Johnson', email: 'sarah@example.com', orders: 8, totalSpent: 675.50, joinedDate: '2024-06-20' },
  { id: 'C003', name: 'Michael Brown', email: 'michael@example.com', orders: 22, totalSpent: 2340.75, joinedDate: '2023-11-10' },
  { id: 'C004', name: 'Emily Davis', email: 'emily@example.com', orders: 5, totalSpent: 389.20, joinedDate: '2025-01-05' },
  { id: 'C005', name: 'David Wilson', email: 'david@example.com', orders: 12, totalSpent: 1089.40, joinedDate: '2024-08-18' },
];
