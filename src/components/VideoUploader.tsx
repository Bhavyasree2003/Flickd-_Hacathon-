
import { useState, useRef } from 'react';
import { Upload, Video, FileVideo } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface VideoUploaderProps {
  onVideoUpload: (file: File) => void;
}

const VideoUploader = ({ onVideoUpload }: VideoUploaderProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const videoFile = files.find(file => file.type.startsWith('video/'));
    
    if (videoFile) {
      onVideoUpload(videoFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      onVideoUpload(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-2xl mx-auto perspective-1000">
      <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl transform hover:rotate-y-5 hover:scale-105 transition-all duration-500" 
            style={{
              boxShadow: '0 25px 50px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.2)'
            }}>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <FileVideo className="text-purple-600 transform hover:rotate-12 transition-transform duration-300" size={32} />
            Upload Fashion Video
          </CardTitle>
          <CardDescription className="text-lg">
            Upload a video to analyze fashion items and vibes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`
              border-2 border-dashed rounded-xl p-12 text-center transition-all duration-500 cursor-pointer transform perspective-1000
              ${isDragOver 
                ? 'border-purple-500 bg-purple-50 scale-105 rotate-x-5 shadow-2xl' 
                : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50 hover:scale-102 hover:shadow-xl'
              }
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleUploadClick}
            style={{
              boxShadow: isDragOver ? '0 20px 40px rgba(147, 51, 234, 0.2), inset 0 0 20px rgba(147, 51, 234, 0.1)' : ''
            }}
          >
            <div className="space-y-4">
              <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 transform ${
                isDragOver ? 'bg-purple-500 scale-125 rotate-12 shadow-2xl' : 'bg-purple-100 hover:scale-110 hover:rotate-6'
              }`} style={{
                boxShadow: isDragOver ? '0 10px 25px rgba(147, 51, 234, 0.4)' : ''
              }}>
                <Upload className={`${isDragOver ? 'text-white' : 'text-purple-600'} transform hover:scale-110 transition-transform duration-300`} size={32} />
              </div>
              
              <div className="transform hover:scale-105 transition-all duration-300">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Drop your video here
                </h3>
                <p className="text-gray-500 mb-4">
                  or click to browse files
                </p>
                <p className="text-sm text-gray-400">
                  Supports MP4, MOV, AVI • Max 100MB
                </p>
              </div>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          <div className="mt-8 text-center">
            <Button 
              onClick={handleUploadClick}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 transform hover:scale-110 hover:rotate-2"
              style={{
                boxShadow: '0 15px 35px rgba(147, 51, 234, 0.3), 0 5px 15px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)'
              }}
            >
              Choose Video File
            </Button>
          </div>

          {/* Sample Videos with 3D Effect */}
          <div className="mt-8 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow-inner transform hover:scale-105 transition-all duration-300">
            <h4 className="font-semibold text-gray-900 mb-2">Try Sample Videos:</h4>
            <div className="space-y-2">
              <button className="text-purple-600 hover:text-purple-700 text-sm underline block transform hover:scale-105 hover:translate-x-2 transition-all duration-300">
                sample_coquette_outfit.mp4
              </button>
              <button className="text-purple-600 hover:text-purple-700 text-sm underline block transform hover:scale-105 hover:translate-x-2 transition-all duration-300">
                sample_streetcore_look.mp4
              </button>
              <button className="text-purple-600 hover:text-purple-700 text-sm underline block transform hover:scale-105 hover:translate-x-2 transition-all duration-300">
                sample_y2k_style.mp4
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoUploader;
