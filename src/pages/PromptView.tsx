import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Package, ArrowRight, Sparkles, LogOut } from 'lucide-react';
import { mockProducts } from '@/data/mockData';

interface CommandResult {
  command: string;
  action: string;
  result: string;
  data?: any;
}

const PromptView = () => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<CommandResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toggleViewMode, logout } = useStore();

  const processPrompt = async () => {
    if (!prompt.trim()) return;

    setIsProcessing(true);

    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 800));

    const lowerPrompt = prompt.toLowerCase();
    let commandResult: CommandResult;

    if (lowerPrompt.includes('add') && lowerPrompt.includes('stock')) {
      const match = prompt.match(/add (\d+) (.+?) to stock/i);
      const quantity = match?.[1] || '10';
      const product = match?.[2] || 'product';
      commandResult = {
        command: prompt,
        action: 'ADD_STOCK',
        result: `Successfully added ${quantity} units of ${product} to inventory`,
        data: { quantity, product },
      };
    } else if (lowerPrompt.includes('low stock') || lowerPrompt.includes('low-stock')) {
      const lowStockProducts = mockProducts.filter((p) => p.status === 'low-stock' || p.status === 'out-of-stock');
      commandResult = {
        command: prompt,
        action: 'QUERY_LOW_STOCK',
        result: `Found ${lowStockProducts.length} products with low or no stock`,
        data: lowStockProducts,
      };
    } else if (lowerPrompt.includes('show') || lowerPrompt.includes('list')) {
      commandResult = {
        command: prompt,
        action: 'LIST_PRODUCTS',
        result: `Showing ${mockProducts.length} products in inventory`,
        data: mockProducts.slice(0, 5),
      };
    } else {
      commandResult = {
        command: prompt,
        action: 'UNKNOWN',
        result: 'Command understood. Try commands like "Add 10 apples to stock" or "Show low-stock products"',
      };
    }

    setResult(commandResult);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-xl flex items-center justify-center">
              <Package className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
            </div>
            <h1 className="text-lg sm:text-xl font-light font-sans tracking-tight">Peninsula</h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              variant="outline"
              onClick={toggleViewMode}
              className="rounded-2xl text-xs sm:text-sm px-3 sm:px-4"
            >
              <span className="hidden sm:inline">Switch to Traditional View</span>
              <span className="sm:hidden">Traditional</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              className="rounded-xl"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto space-y-6 sm:space-y-8"
        >
          {/* Title Section */}
          <div className="text-center space-y-2 sm:space-y-3">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-accent rounded-full text-xs sm:text-sm text-accent-foreground mb-2 sm:mb-4">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>AI-Powered Commands</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold">What would you like to do?</h2>
            <p className="text-muted-foreground text-sm sm:text-lg">
              Type natural language commands to manage your inventory
            </p>
          </div>

          {/* Prompt Input */}
          <div className="space-y-3 sm:space-y-4">
            <Textarea
              placeholder="Try: 'Add 10 apples to stock' or 'Show low-stock products'"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-24 sm:min-h-32 rounded-2xl text-sm sm:text-lg resize-none shadow-soft"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.metaKey) {
                  processPrompt();
                }
              }}
            />
            <Button
              onClick={processPrompt}
              disabled={!prompt.trim() || isProcessing}
              className="w-full h-12 sm:h-14 rounded-2xl text-base sm:text-lg"
            >
              {isProcessing ? (
                'Processing...'
              ) : (
                <>
                  Process Command
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </>
              )}
            </Button>
          </div>

          {/* Result Display */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card shadow-medium rounded-2xl p-6 space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                    Action: {result.action}
                  </h3>
                  <p className="text-lg">{result.result}</p>
                </div>
              </div>

              {result.data && Array.isArray(result.data) && (
                <div className="mt-6 overflow-x-auto">
                  {/* Desktop Table */}
                  <table className="hidden sm:table w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-2 font-medium text-muted-foreground">Product</th>
                        <th className="text-left py-3 px-2 font-medium text-muted-foreground">Category</th>
                        <th className="text-left py-3 px-2 font-medium text-muted-foreground">Stock</th>
                        <th className="text-left py-3 px-2 font-medium text-muted-foreground">Price</th>
                        <th className="text-left py-3 px-2 font-medium text-muted-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.data.map((product: any, idx: number) => (
                        <tr key={idx} className="border-b border-border/50 last:border-0">
                          <td className="py-3 px-2 font-medium">{product.name}</td>
                          <td className="py-3 px-2 text-muted-foreground">{product.category}</td>
                          <td className="py-3 px-2">{product.stock}</td>
                          <td className="py-3 px-2">${product.price.toFixed(2)}</td>
                          <td className="py-3 px-2">
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                product.status === 'in-stock'
                                  ? 'bg-green-100 text-green-700'
                                  : product.status === 'low-stock'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-red-100 text-red-700'
                              }`}
                            >
                              {product.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Mobile Cards */}
                  <div className="sm:hidden space-y-2">
                    {result.data.map((product: any, idx: number) => (
                      <div key={idx} className="bg-background rounded-lg p-3 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-sm">{product.name}</p>
                            <p className="text-xs text-muted-foreground">{product.category}</p>
                          </div>
                          <span
                            className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                              product.status === 'in-stock'
                                ? 'bg-green-100 text-green-700'
                                : product.status === 'low-stock'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {product.status}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Stock: {product.stock}</span>
                          <span className="font-medium">${product.price.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Example Commands */}
          <div className="bg-accent/50 rounded-2xl p-6 space-y-3">
            <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              Example Commands
            </h4>
            <div className="space-y-2">
              {[
                'Add 15 apples to stock',
                'Show low-stock products',
                'List all products',
                'Show products in Fruits category',
              ].map((example, idx) => (
                <button
                  key={idx}
                  onClick={() => setPrompt(example)}
                  className="block w-full text-left px-4 py-2 rounded-xl hover:bg-background transition-colors text-sm"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default PromptView;
