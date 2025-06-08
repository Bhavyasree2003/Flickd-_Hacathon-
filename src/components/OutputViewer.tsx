
import { useEffect, useState } from 'react';
import { Download, Code, Copy, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface OutputViewerProps {
  detectionResults: any;
  productMatches: any;
  vibeResults: any;
  onOutputGenerated: (output: any) => void;
}

const OutputViewer = ({ detectionResults, productMatches, vibeResults, onOutputGenerated }: OutputViewerProps) => {
  const [finalOutput, setFinalOutput] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Generate final structured output
    const output = {
      video_id: "abc123",
      timestamp: new Date().toISOString(),
      processing_time_ms: 4200,
      vibes: vibeResults?.map((v: any) => v.vibe) || ["coquette", "party glam"],
      products: productMatches?.filter((m: any) => m.match_type !== 'no_match').map((match: any) => ({
        type: match.type,
        color: match.color,
        match_type: match.match_type,
        matched_product_id: match.matched_product_id,
        confidence: match.confidence,
        product_name: match.product_name
      })) || [],
      detection_metadata: {
        frames_analyzed: 3,
        total_objects_detected: 4,
        average_confidence: 0.85,
        model_version: "yolov8n"
      },
      matching_metadata: {
        catalog_size: 200,
        embedding_model: "clip-vit-base-patch32",
        similarity_threshold: 0.75
      },
      vibe_metadata: {
        nlp_model: "distilbert-base-uncased",
        caption_analyzed: true,
        hashtags_processed: 5
      }
    };

    setFinalOutput(output);
    onOutputGenerated(output);
  }, [detectionResults, productMatches, vibeResults, onOutputGenerated]);

  const handleCopyJson = async () => {
    if (finalOutput) {
      try {
        await navigator.clipboard.writeText(JSON.stringify(finalOutput, null, 2));
        setCopied(true);
        toast.success('JSON copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        toast.error('Failed to copy JSON');
      }
    }
  };

  const handleDownloadJson = () => {
    if (finalOutput) {
      const blob = new Blob([JSON.stringify(finalOutput, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `flickd_analysis_${finalOutput.video_id}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('JSON file downloaded!');
    }
  };

  if (!finalOutput) {
    return (
      <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
        <CardContent className="flex items-center justify-center p-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Generating final output...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="text-green-600" size={24} />
          Final JSON Output
        </CardTitle>
        <CardDescription>
          Structured API Response for Flickd Engine
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{finalOutput.vibes.length}</div>
              <div className="text-sm text-gray-600">Vibes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{finalOutput.products.length}</div>
              <div className="text-sm text-gray-600">Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{finalOutput.detection_metadata.frames_analyzed}</div>
              <div className="text-sm text-gray-600">Frames</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{finalOutput.processing_time_ms}ms</div>
              <div className="text-sm text-gray-600">Process Time</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              onClick={handleCopyJson}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            >
              {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy JSON'}
            </Button>
            <Button 
              onClick={handleDownloadJson}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
            >
              <Download size={16} />
              Download JSON
            </Button>
          </div>

          {/* JSON Preview */}
          <div className="relative">
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono max-h-96 overflow-y-auto">
              {JSON.stringify(finalOutput, null, 2)}
            </pre>
          </div>

          {/* API Endpoint Example */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">API Endpoint Example</h4>
            <div className="bg-gray-800 text-green-400 p-3 rounded font-mono text-sm">
              <div className="text-blue-400">POST</div>
              <div>https://api.flickd.app/v1/analyze-video</div>
              <div className="mt-2 text-gray-400">// Response format matches above JSON structure</div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 border border-gray-200 rounded-lg">
              <h5 className="font-semibold text-sm text-gray-900 mb-1">Detection</h5>
              <p className="text-xs text-gray-600">YOLOv8 • 4 objects • 85% avg confidence</p>
            </div>
            <div className="p-3 border border-gray-200 rounded-lg">
              <h5 className="font-semibold text-sm text-gray-900 mb-1">Matching</h5>
              <p className="text-xs text-gray-600">CLIP + FAISS • 200 catalog items • 0.75 threshold</p>
            </div>
            <div className="p-3 border border-gray-200 rounded-lg">
              <h5 className="font-semibold text-sm text-gray-900 mb-1">Classification</h5>
              <p className="text-xs text-gray-600">DistilBERT • 2 vibes detected • NLP analysis</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OutputViewer;
