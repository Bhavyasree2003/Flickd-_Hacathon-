
import { useState } from 'react';
import { Upload, Video, Sparkles, ShoppingBag, Brain, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import VideoUploader from '@/components/VideoUploader';
import DetectionResults from '@/components/DetectionResults';
import VibeClassifier from '@/components/VibeClassifier';
import ProductMatcher from '@/components/ProductMatcher';
import OutputViewer from '@/components/OutputViewer';

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [detectionResults, setDetectionResults] = useState(null);
  const [vibeResults, setVibeResults] = useState(null);
  const [productMatches, setProductMatches] = useState(null);
  const [finalOutput, setFinalOutput] = useState(null);

  const steps = [
    { icon: Upload, title: 'Upload Video', description: 'Upload your fashion video for analysis' },
    { icon: Video, title: 'Frame Extraction', description: 'Extract key frames from video' },
    { icon: ShoppingBag, title: 'Object Detection', description: 'Detect fashion items using YOLOv8' },
    { icon: Sparkles, title: 'Product Matching', description: 'Match items using CLIP embeddings' },
    { icon: Brain, title: 'Vibe Classification', description: 'Classify aesthetic vibes with NLP' },
    { icon: Download, title: 'Results', description: 'View structured JSON output' }
  ];

  const handleVideoUpload = (file: File) => {
    setVideoFile(file);
    setCurrentStep(1);
    // Simulate processing steps
    setTimeout(() => setCurrentStep(2), 1000);
    setTimeout(() => setCurrentStep(3), 2000);
    setTimeout(() => setCurrentStep(4), 3000);
    setTimeout(() => setCurrentStep(5), 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 relative overflow-hidden">
      {/* 3D Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse transform rotate-45"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-pink-300/20 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-purple-300/15 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-orange-300/20 rounded-full blur-lg"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header with 3D Effect */}
        <div className="text-center mb-12 transform perspective-1000">
          <h1 className="text-5xl font-bold text-white mb-4 transform rotate-x-12 hover:rotate-x-0 transition-all duration-500 drop-shadow-2xl">
            Flickd AI Engine
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto transform translate-z-20 hover:translate-z-40 transition-all duration-300">
            Smart Tagging & Vibe Classification for Gen Z Fashion Discovery
          </p>
        </div>

        {/* Progress Steps with 3D Effect */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 transform hover:scale-105 transition-all duration-300 shadow-2xl border border-white/20">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              
              return (
                <div key={index} className="flex items-center">
                  <div className={`
                    flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-12
                    ${isActive ? 'bg-white text-purple-600 scale-110 shadow-xl animate-pulse' : 
                      isCompleted ? 'bg-green-500 text-white shadow-lg' : 'bg-white/20 text-white/60'}
                  `} style={{
                    boxShadow: isActive ? '0 10px 25px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)' : '',
                    transform: isActive ? 'translateZ(20px) rotateY(10deg)' : ''
                  }}>
                    <Icon size={20} />
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 mx-2 transition-all duration-300 ${
                      isCompleted ? 'bg-green-500 shadow-lg' : 'bg-white/20'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {currentStep === 0 && (
            <div className="transform hover:scale-105 transition-all duration-500">
              <VideoUploader onVideoUpload={handleVideoUpload} />
            </div>
          )}
          
          {currentStep >= 1 && videoFile && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl transform hover:scale-105 hover:rotate-y-5 transition-all duration-500 perspective-1000">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Video className="text-purple-600 transform hover:rotate-12 transition-transform duration-300" size={24} />
                    Video Processing
                  </CardTitle>
                  <CardDescription>
                    Processing: {videoFile.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center transform hover:scale-95 transition-all duration-300 shadow-inner">
                    <div className="text-center transform hover:scale-110 transition-all duration-300">
                      <Video size={48} className="text-gray-400 mx-auto mb-2 animate-pulse" />
                      <p className="text-sm text-gray-500">Video Preview</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl transform hover:scale-105 hover:rotate-y-5 transition-all duration-500 perspective-1000">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Sparkles className="text-pink-600 transform hover:rotate-45 transition-transform duration-300" size={24} />
                    Current Step
                  </CardTitle>
                  <CardDescription>
                    {steps[currentStep]?.description || 'Processing...'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm text-gray-500">{Math.round((currentStep / (steps.length - 1)) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                      <div 
                        className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all duration-500 shadow-lg transform hover:scale-y-110"
                        style={{ 
                          width: `${(currentStep / (steps.length - 1)) * 100}%`,
                          boxShadow: '0 4px 15px rgba(147, 51, 234, 0.4)'
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {currentStep >= 2 && (
            <div className="transform hover:scale-105 transition-all duration-500 mb-8">
              <DetectionResults 
                results={detectionResults}
                onResultsUpdate={setDetectionResults}
              />
            </div>
          )}

          {currentStep >= 3 && (
            <div className="transform hover:scale-105 transition-all duration-500 mb-8">
              <ProductMatcher 
                detectionResults={detectionResults}
                onMatchesUpdate={setProductMatches}
              />
            </div>
          )}

          {currentStep >= 4 && (
            <div className="transform hover:scale-105 transition-all duration-500 mb-8">
              <VibeClassifier 
                onVibesUpdate={setVibeResults}
              />
            </div>
          )}

          {currentStep >= 5 && (
            <div className="transform hover:scale-105 transition-all duration-500">
              <OutputViewer 
                detectionResults={detectionResults}
                productMatches={productMatches}
                vibeResults={vibeResults}
                onOutputGenerated={setFinalOutput}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
