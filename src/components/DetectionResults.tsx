
import { useEffect, useState } from 'react';
import { Eye, Target, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface DetectionResult {
  id: string;
  class_name: string;
  confidence: number;
  bbox: [number, number, number, number];
  frame_number: number;
}

interface DetectionResultsProps {
  results: DetectionResult[] | null;
  onResultsUpdate: (results: DetectionResult[]) => void;
}

const DetectionResults = ({ results, onResultsUpdate }: DetectionResultsProps) => {
  const [detections, setDetections] = useState<DetectionResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    // Simulate YOLOv8 detection process
    const mockDetections: DetectionResult[] = [
      {
        id: '1',
        class_name: 'dress',
        confidence: 0.92,
        bbox: [120, 80, 200, 350],
        frame_number: 1
      },
      {
        id: '2', 
        class_name: 'shoes',
        confidence: 0.87,
        bbox: [140, 420, 120, 80],
        frame_number: 1
      },
      {
        id: '3',
        class_name: 'bag',
        confidence: 0.78,
        bbox: [250, 180, 80, 90],
        frame_number: 2
      },
      {
        id: '4',
        class_name: 'earrings',
        confidence: 0.83,
        bbox: [180, 60, 20, 25],
        frame_number: 3
      }
    ];

    const timer = setTimeout(() => {
      setDetections(mockDetections);
      onResultsUpdate(mockDetections);
      setIsProcessing(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onResultsUpdate]);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'bg-green-500';
    if (confidence >= 0.8) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  const getClassIcon = (className: string) => {
    const icons: { [key: string]: string } = {
      dress: '👗',
      shoes: '👠',
      bag: '👜',
      earrings: '💎',
      top: '👕',
      bottom: '👖',
      jacket: '🧥'
    };
    return icons[className] || '👔';
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl mb-8 transform hover:scale-105 hover:rotate-y-2 transition-all duration-500 perspective-1000"
          style={{
            boxShadow: '0 25px 50px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.2)'
          }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="text-purple-600 transform hover:rotate-45 transition-transform duration-300" size={24} />
          Object Detection Results
        </CardTitle>
        <CardDescription>
          YOLOv8 Fashion Item Detection
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isProcessing ? (
          <div className="flex items-center justify-center p-12">
            <div className="text-center transform hover:scale-110 transition-all duration-300">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4 shadow-lg"></div>
              <p className="text-gray-600">Processing frames with YOLOv8...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg shadow-inner transform hover:scale-105 transition-all duration-300">
              <div className="text-center transform hover:scale-110 transition-all duration-300">
                <div className="text-2xl font-bold text-purple-600 drop-shadow-lg">{detections.length}</div>
                <div className="text-sm text-gray-600">Items Detected</div>
              </div>
              <div className="text-center transform hover:scale-110 transition-all duration-300">
                <div className="text-2xl font-bold text-pink-600 drop-shadow-lg">3</div>
                <div className="text-sm text-gray-600">Frames Analyzed</div>
              </div>
              <div className="text-center transform hover:scale-110 transition-all duration-300">
                <div className="text-2xl font-bold text-orange-600 drop-shadow-lg">
                  {Math.round((detections.reduce((sum, d) => sum + d.confidence, 0) / detections.length) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Avg Confidence</div>
              </div>
            </div>

            {/* Detection Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {detections.map((detection) => (
                <div 
                  key={detection.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:rotate-1 perspective-1000 bg-gradient-to-br from-white to-gray-50"
                  style={{
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.5)'
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl transform hover:scale-125 hover:rotate-12 transition-all duration-300">{getClassIcon(detection.class_name)}</span>
                      <span className="font-semibold capitalize">{detection.class_name}</span>
                    </div>
                    <Badge className={`${getConfidenceColor(detection.confidence)} text-white shadow-lg transform hover:scale-110 transition-all duration-300`}>
                      {Math.round(detection.confidence * 100)}%
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Frame:</span>
                      <span>#{detection.frame_number}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bounding Box:</span>
                      <span className="font-mono text-xs">
                        [{detection.bbox.join(', ')}]
                      </span>
                    </div>
                  </div>

                  {/* Mock bounding box visualization */}
                  <div className="mt-3 aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded relative overflow-hidden shadow-inner transform hover:scale-95 transition-all duration-300">
                    <div 
                      className="absolute border-2 border-purple-500 bg-purple-500/10 shadow-lg transform hover:scale-110 transition-all duration-300"
                      style={{
                        left: `${(detection.bbox[0] / 400) * 100}%`,
                        top: `${(detection.bbox[1] / 300) * 100}%`,
                        width: `${(detection.bbox[2] / 400) * 100}%`,
                        height: `${(detection.bbox[3] / 300) * 100}%`,
                        boxShadow: '0 5px 15px rgba(147, 51, 234, 0.3)'
                      }}
                    >
                      <div className="absolute -top-6 left-0 text-xs bg-purple-500 text-white px-1 rounded shadow-lg">
                        {detection.class_name}
                      </div>
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

export default DetectionResults;
