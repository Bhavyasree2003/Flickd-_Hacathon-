
import { useEffect, useState } from 'react';
import { Search, Package, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProductMatch {
  id: string;
  type: string;
  color: string;
  match_type: 'exact' | 'similar' | 'no_match';
  matched_product_id: string;
  confidence: number;
  product_name: string;
  product_image: string;
}

interface ProductMatcherProps {
  detectionResults: any;
  onMatchesUpdate: (matches: ProductMatch[]) => void;
}

const ProductMatcher = ({ detectionResults, onMatchesUpdate }: ProductMatcherProps) => {
  const [matches, setMatches] = useState<ProductMatch[]>([]);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    // Simulate CLIP + FAISS matching process
    const mockMatches: ProductMatch[] = [
      {
        id: '1',
        type: 'dress',
        color: 'black',
        match_type: 'exact',
        matched_product_id: 'prod_001',
        confidence: 0.94,
        product_name: 'Elegant Black Mini Dress',
        product_image: '/placeholder.svg'
      },
      {
        id: '2',
        type: 'shoes',
        color: 'black',
        match_type: 'similar',
        matched_product_id: 'prod_045',
        confidence: 0.82,
        product_name: 'Classic Black Heels',
        product_image: '/placeholder.svg'
      },
      {
        id: '3',
        type: 'bag',
        color: 'brown',
        match_type: 'similar',
        matched_product_id: 'prod_123',
        confidence: 0.77,
        product_name: 'Vintage Leather Handbag',
        product_image: '/placeholder.svg'
      },
      {
        id: '4',
        type: 'earrings',
        color: 'gold',
        match_type: 'no_match',
        matched_product_id: '',
        confidence: 0.45,
        product_name: '',
        product_image: ''
      }
    ];

    const timer = setTimeout(() => {
      setMatches(mockMatches);
      onMatchesUpdate(mockMatches);
      setIsProcessing(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [detectionResults, onMatchesUpdate]);

  const getMatchIcon = (matchType: string) => {
    switch (matchType) {
      case 'exact':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'similar':
        return <AlertCircle className="text-yellow-500" size={20} />;
      case 'no_match':
        return <XCircle className="text-red-500" size={20} />;
      default:
        return <Search className="text-gray-500" size={20} />;
    }
  };

  const getMatchBadgeColor = (matchType: string) => {
    switch (matchType) {
      case 'exact':
        return 'bg-green-500 text-white';
      case 'similar':
        return 'bg-yellow-500 text-white';
      case 'no_match':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="text-pink-600" size={24} />
          Product Matching Results
        </CardTitle>
        <CardDescription>
          CLIP Embeddings + FAISS Similarity Search
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isProcessing ? (
          <div className="flex items-center justify-center p-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Matching products using CLIP embeddings...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Summary Stats */}
            <div className="grid grid-cols-4 gap-4 p-4 bg-gradient-to-r from-pink-50 to-orange-50 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {matches.filter(m => m.match_type === 'exact').length}
                </div>
                <div className="text-sm text-gray-600">Exact Matches</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {matches.filter(m => m.match_type === 'similar').length}
                </div>
                <div className="text-sm text-gray-600">Similar Matches</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {matches.filter(m => m.match_type === 'no_match').length}
                </div>
                <div className="text-sm text-gray-600">No Matches</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">200</div>
                <div className="text-sm text-gray-600">Catalog Items</div>
              </div>
            </div>

            {/* Matches Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matches.map((match) => (
                <div 
                  key={match.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getMatchIcon(match.match_type)}
                      <span className="font-semibold capitalize">{match.type}</span>
                      <span className="text-gray-500">({match.color})</span>
                    </div>
                    <Badge className={getMatchBadgeColor(match.match_type)}>
                      {match.match_type.replace('_', ' ')}
                    </Badge>
                  </div>

                  {match.match_type !== 'no_match' && (
                    <div className="flex gap-3 mb-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Package className="text-gray-400" size={24} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{match.product_name}</h4>
                        <p className="text-xs text-gray-500 mb-1">ID: {match.matched_product_id}</p>
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-gray-500">Confidence:</span>
                          <span className="text-xs font-semibold">{Math.round(match.confidence * 100)}%</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {match.match_type === 'no_match' && (
                    <div className="text-center py-6 text-gray-500">
                      <XCircle size={32} className="mx-auto mb-2 text-gray-300" />
                      <p className="text-sm">No similar products found in catalog</p>
                      <p className="text-xs">Confidence too low ({Math.round(match.confidence * 100)}%)</p>
                    </div>
                  )}

                  {/* Similarity threshold indicator */}
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Similarity Score</span>
                      <span>{match.confidence.toFixed(3)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          match.confidence >= 0.9 ? 'bg-green-500' :
                          match.confidence >= 0.75 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${match.confidence * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductMatcher;
