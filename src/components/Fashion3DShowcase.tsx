
import React, { Suspense, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html, useProgress, Stars, Sparkles as DreiSparkles, Float, Text } from '@react-three/drei';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RotateCcw, ZoomIn, Eye, ShoppingBag } from 'lucide-react';
import Fashion3DModel from './Fashion3DModel';
import * as THREE from 'three';

const items = [
  {
    id: 1,
    name: 'Designer Dress',
    price: '$299',
    category: 'Dresses',
    color: '#ff6b9d',
    description: 'Elegant evening dress with modern cut',
    type: 'dress'
  },
  {
    id: 2,
    name: 'Luxury Handbag',
    price: '$459',
    category: 'Accessories',
    color: '#8b5a3c',
    description: 'Premium leather handbag',
    type: 'handbag'
  },
  {
    id: 3,
    name: 'Designer Heels',
    price: '$189',
    category: 'Shoes',
    color: '#000000',
    description: 'Classic high heels with gold accents',
    type: 'shoes'
  }
];

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="bg-black/80 backdrop-blur-lg rounded-xl p-6 shadow-2xl border border-purple-500/20">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm text-purple-300 font-medium">Loading 3D Experience</p>
          <p className="text-xs text-purple-400">{Math.round(progress)}%</p>
          <div className="w-32 h-1 bg-gray-700 rounded-full mt-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </Html>
  );
}

function Scene3DEffects({ selectedItem }: { selectedItem: any }) {
  return (
    <>
      {/* Enhanced Lighting Setup */}
      <ambientLight intensity={0.2} />
      
      {/* Key Light */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      
      {/* Fill Lights */}
      <pointLight position={[-10, 5, -10]} intensity={0.8} color="#8b5cf6" />
      <pointLight position={[10, -5, 10]} intensity={0.6} color="#ec4899" />
      <pointLight position={[0, 10, 0]} intensity={0.4} color="#06b6d4" />
      
      {/* Rim Light */}
      <spotLight
        position={[0, 20, -10]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        color="#ffffff"
        castShadow
      />

      {/* Animated Floating Elements */}
      <Float
        speed={2}
        rotationIntensity={0.5}
        floatIntensity={0.5}
        floatingRange={[1, 2]}
      >
        <DreiSparkles
          count={50}
          scale={3}
          size={6}
          speed={0.6}
          opacity={0.6}
          color="#8b5cf6"
        />
      </Float>

      <Float
        speed={1.5}
        rotationIntensity={0.3}
        floatIntensity={0.8}
        floatingRange={[2, 4]}
      >
        <DreiSparkles
          count={30}
          scale={2}
          size={4}
          speed={0.4}
          opacity={0.4}
          color="#ec4899"
        />
      </Float>

      {/* Background Stars */}
      <Stars
        radius={100}
        depth={50}
        count={1000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      {/* Floating 3D Text */}
      <Float
        speed={3}
        rotationIntensity={0.2}
        floatIntensity={1}
        floatingRange={[-1, 1]}
      >
        <Text
          position={[0, 4, -5]}
          fontSize={0.8}
          color="#8b5cf6"
          anchorX="center"
          anchorY="middle"
          font="/fonts/helvetiker_regular.typeface.json"
        >
          {selectedItem.name}
        </Text>
      </Float>

      {/* Orbiting Elements */}
      <group>
        {[...Array(8)].map((_, i) => (
          <Float
            key={i}
            speed={1 + i * 0.2}
            rotationIntensity={0.3}
            floatIntensity={0.5}
          >
            <mesh
              position={[
                Math.cos((i / 8) * Math.PI * 2) * 6,
                Math.sin(Date.now() * 0.001 + i) * 2,
                Math.sin((i / 8) * Math.PI * 2) * 6
              ]}
              scale={0.1}
            >
              <sphereGeometry args={[1, 8, 8]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? "#8b5cf6" : "#ec4899"}
                emissive={i % 2 === 0 ? "#8b5cf6" : "#ec4899"}
                emissiveIntensity={0.3}
                transparent
                opacity={0.7}
              />
            </mesh>
          </Float>
        ))}
      </group>

      {/* Animated Ground Plane */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -3, 0]}
        receiveShadow
      >
        <planeGeometry args={[20, 20, 32, 32]} />
        <meshStandardMaterial
          color="#1a1a2e"
          transparent
          opacity={0.8}
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* Holographic Effect Rings */}
      {[1, 2, 3].map((ring, i) => (
        <Float
          key={i}
          speed={1 + i * 0.5}
          rotationIntensity={0.2}
          floatIntensity={0.3}
        >
          <mesh
            position={[0, 0, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={ring * 2}
          >
            <ringGeometry args={[1.8, 2, 32]} />
            <meshStandardMaterial
              color="#8b5cf6"
              transparent
              opacity={0.1 / ring}
              emissive="#8b5cf6"
              emissiveIntensity={0.1}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

const Fashion3DShowcase = () => {
  const [selectedItem, setSelectedItem] = useState(items[0]);
  const [isRotating, setIsRotating] = useState(true);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const controlsRef = useRef<any>();

  const resetView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-32 w-48 h-48 bg-pink-500/10 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl animate-ping"></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-12 transform perspective-1000">
          <h1 className="text-6xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
            3D Fashion Universe
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto transform hover:scale-105 transition-all duration-300">
            Experience fashion in a whole new dimension with immersive 3D effects
          </p>
          <div className="mt-4 flex justify-center space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enhanced 3D Viewer */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900/80 backdrop-blur-lg border-purple-500/20 border-2 overflow-hidden shadow-2xl shadow-purple-500/10">
              <CardHeader className="pb-2 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-3xl text-white font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                      {selectedItem.name}
                    </CardTitle>
                    <CardDescription className="text-gray-300 text-lg">
                      {selectedItem.description}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="bg-purple-600 text-white text-sm px-3 py-1">
                      {selectedItem.category}
                    </Badge>
                    <Badge variant="outline" className="text-white border-purple-400 text-lg px-3 py-1 font-bold">
                      {selectedItem.price}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="aspect-[4/3] relative">
                  <Canvas
                    camera={{ position: [0, 2, 8], fov: 50 }}
                    style={{ background: 'radial-gradient(circle at center, #1a0b3d 0%, #0f051a 70%, #000000 100%)' }}
                    shadows
                    gl={{ 
                      antialias: true, 
                      alpha: true,
                      powerPreference: "high-performance"
                    }}
                  >
                    <Suspense fallback={<Loader />}>
                      {/* 3D Scene Effects */}
                      <Scene3DEffects selectedItem={selectedItem} />

                      {/* Environment */}
                      <Environment preset="night" />

                      {/* Main 3D Model */}
                      <Float
                        speed={2}
                        rotationIntensity={isRotating ? 0.3 : 0}
                        floatIntensity={0.8}
                        floatingRange={[0, 1]}
                      >
                        <Fashion3DModel
                          item={selectedItem}
                          isRotating={isRotating}
                        />
                      </Float>

                      {/* Enhanced Shadows */}
                      <ContactShadows
                        position={[0, -2.5, 0]}
                        opacity={0.5}
                        scale={15}
                        blur={3}
                        far={6}
                        color="#8b5cf6"
                      />

                      {/* Controls */}
                      <OrbitControls
                        ref={controlsRef}
                        enablePan={true}
                        enableZoom={true}
                        enableRotate={true}
                        minDistance={4}
                        maxDistance={12}
                        autoRotate={isRotating}
                        autoRotateSpeed={3}
                        dampingFactor={0.05}
                        enableDamping
                      />
                    </Suspense>
                  </Canvas>

                  {/* Enhanced Controls Overlay */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setIsRotating(!isRotating)}
                      className="bg-purple-600/80 backdrop-blur-sm hover:bg-purple-700/80 text-white border-0 shadow-lg shadow-purple-500/25"
                    >
                      <RotateCcw size={16} />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={resetView}
                      className="bg-pink-600/80 backdrop-blur-sm hover:bg-pink-700/80 text-white border-0 shadow-lg shadow-pink-500/25"
                    >
                      <ZoomIn size={16} />
                    </Button>
                  </div>

                  {/* Enhanced Instructions */}
                  <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-lg rounded-xl p-4 text-white text-sm border border-purple-500/20">
                    <p className="flex items-center gap-2 mb-2 text-purple-300">
                      <Eye size={16} />
                      Interactive 3D Controls
                    </p>
                    <p className="text-xs text-gray-400">• Click & drag to rotate</p>
                    <p className="text-xs text-gray-400">• Scroll to zoom</p>
                    <p className="text-xs text-gray-400">• Right-click & drag to pan</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Product List */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Collection
            </h3>
            {items.map((item) => (
              <Card
                key={item.id}
                className={`cursor-pointer transition-all duration-500 transform hover:scale-105 hover:shadow-2xl backdrop-blur-lg ${
                  selectedItem.id === item.id
                    ? 'bg-gradient-to-r from-purple-600/30 to-pink-600/30 border-purple-400 shadow-purple-500/30 shadow-xl scale-105'
                    : 'bg-gray-800/60 border-gray-600/50 hover:bg-gradient-to-r hover:from-gray-700/70 hover:to-gray-600/70'
                }`}
                onClick={() => setSelectedItem(item)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-16 h-16 rounded-xl flex-shrink-0 shadow-xl relative overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${item.color}, ${item.color}66)`
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white text-lg mb-1">{item.name}</h4>
                      <p className="text-sm text-gray-400 mb-2">{item.category}</p>
                      <p className="text-purple-400 font-bold text-lg">{item.price}</p>
                    </div>
                    {hoveredItem === item.id && (
                      <ShoppingBag className="text-purple-400 animate-bounce" size={24} />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Enhanced Action Buttons */}
            <div className="pt-6 space-y-4">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 text-lg font-semibold shadow-xl shadow-purple-500/25 transform hover:scale-105 transition-all duration-300">
                Add to Cart
              </Button>
              <Button variant="outline" className="w-full border-purple-400 text-purple-400 hover:bg-purple-600 hover:text-white py-3 text-lg font-semibold transition-all duration-300">
                View Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fashion3DShowcase;
