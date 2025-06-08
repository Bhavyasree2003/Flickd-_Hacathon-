
import { useEffect, useState } from 'react';
import { Brain, Sparkles, Hash } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface VibeResult {
  vibe: string;
  confidence: number;
  keywords: string[];
}

interface VibeClassifierProps {
  onVibesUpdate: (vibes: VibeResult[]) => void;
}

const VibeClassifier = ({ onVibesUpdate }: VibeClassifierProps) => {
  const [vibes, setVibes] = useState<VibeResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(true);

  const vibeDefinitions = {
    coquette: { emoji: '🎀', color: 'bg-pink-500', description: 'Feminine, romantic, playful' },
    'clean girl': { emoji: '✨', color: 'bg-blue-500', description: 'Minimal, fresh, effortless' },
    cottagecore: { emoji: '🌻', color: 'bg-green-500', description: 'Rural, vintage, cozy' },
    streetcore: { emoji: '🏙️', color: 'bg-gray-700', description: 'Urban, edgy, contemporary' },
    y2k: { emoji: '💫', color: 'bg-purple-500', description: 'Futuristic, metallic, nostalgic' },
    boho: { emoji: '🌙', color: 'bg-orange-500', description: 'Free-spirited, artistic, eclectic' },
    'party glam': { emoji: '✨', color: 'bg-yellow-500', description: 'Bold, glamorous, evening' }
  };

  useEffect(() => {
    // Simulate NLP classification process
    const mockVibes: VibeResult[] = [
      {
        vibe: 'coquette',
        confidence: 0.89,
        keywords: ['feminine', 'bow', 'pink', 'delicate', 'romantic']
      },
      {
        vibe: 'party glam',
        confidence: 0.73,
        keywords: ['evening', 'dress', 'elegant', 'sophisticated']
      }
    ];

    const timer = setTimeout(() => {
      setVibes(mockVibes);
      onVibesUpdate(mockVibes);
      setIsProcessing(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [onVibesUpdate]);

  const mockCaption = "Getting ready for a romantic dinner date 🎀✨ This little black dress is perfect for channeling my inner coquette energy! #coquette #datenight #ootd #romantic #feminine";

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="text-orange-600" size={24} />
          Vibe Classification
        </CardTitle>
        <CardDescription>
          NLP-based Aesthetic Analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isProcessing ? (
          <div className="flex items-center justify-center p-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Analyzing caption and hashtags...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Input Caption */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Hash size={16} />
                Input Caption
              </h4>
              <p className="text-sm text-gray-700 italic">"{mockCaption}"</p>
            </div>

            {/* Detected Vibes */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Detected Vibes</h4>
              {vibes.map((vibe, index) => {
                const vibeInfo = vibeDefinitions[vibe.vibe as keyof typeof vibeDefinitions];
                return (
                  <div 
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{vibeInfo?.emoji}</span>
                        <div>
                          <h5 className="font-semibold capitalize">{vibe.vibe}</h5>
                          <p className="text-xs text-gray-500">{vibeInfo?.description}</p>
                        </div>
                      </div>
                      <Badge className={`${vibeInfo?.color} text-white`}>
                        {Math.round(vibe.confidence * 100)}%
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Confidence Score</span>
                        <span>{vibe.confidence.toFixed(3)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`${vibeInfo?.color} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${vibe.confidence * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="mt-3">
                      <p className="text-xs text-gray-500 mb-2">Key indicators:</p>
                      <div className="flex flex-wrap gap-1">
                        {vibe.keywords.map((keyword, kidx) => (
                          <span 
                            key={kidx}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Available Vibes Reference */}
            <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Available Vibe Categories</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {Object.entries(vibeDefinitions).map(([vibeName, vibeInfo]) => (
                  <div key={vibeName} className="flex items-center gap-2 text-sm">
                    <span className="text-lg">{vibeInfo.emoji}</span>
                    <span className="capitalize">{vibeName}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VibeClassifier;
