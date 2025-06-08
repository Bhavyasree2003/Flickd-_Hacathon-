import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

interface Fashion3DModelProps {
  item: {
    id: number;
    name: string;
    price: string;
    category: string;
    color: string;
    description: string;
    type: string;
  };
  isRotating: boolean;
}

const Fashion3DModel = ({ item, isRotating }: Fashion3DModelProps) => {
  const groupRef = useRef<Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current && isRotating) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  const renderModel = () => {
    switch (item.type) {
      case 'dress':
        return (
          <group>
            {/* Main dress skirt - A-line shape */}
            <mesh position={[0, -0.5, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[1.4, 0.9, 2.2, 24]} />
              <meshStandardMaterial
                color={item.color}
                metalness={0.1}
                roughness={0.3}
                transparent={true}
                opacity={0.95}
              />
            </mesh>

            {/* Dress bodice */}
            <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.65, 0.75, 1.6, 16]} />
              <meshStandardMaterial 
                color={item.color} 
                metalness={0.05} 
                roughness={0.2}
                transparent={true}
                opacity={0.98}
              />
            </mesh>

            {/* Neckline detail */}
            <mesh position={[0, 2.1, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.5, 0.6, 0.3, 16]} />
              <meshStandardMaterial 
                color={item.color} 
                metalness={0.1} 
                roughness={0.1}
              />
            </mesh>

            {/* Left sleeve */}
            <mesh position={[0.85, 1.6, 0]} rotation={[0, 0, Math.PI / 3]} castShadow receiveShadow>
              <cylinderGeometry args={[0.18, 0.25, 1.1, 12]} />
              <meshStandardMaterial
                color={item.color}
                metalness={0.1}
                roughness={0.25}
                transparent={true}
                opacity={0.9}
              />
            </mesh>

            {/* Right sleeve */}
            <mesh position={[-0.85, 1.6, 0]} rotation={[0, 0, -Math.PI / 3]} castShadow receiveShadow>
              <cylinderGeometry args={[0.18, 0.25, 1.1, 12]} />
              <meshStandardMaterial
                color={item.color}
                metalness={0.1}
                roughness={0.25}
                transparent={true}
                opacity={0.9}
              />
            </mesh>

            {/* Waist belt */}
            <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.77, 0.77, 0.08, 24]} />
              <meshStandardMaterial 
                color="#8b4513" 
                metalness={0.3} 
                roughness={0.4}
              />
            </mesh>

            {/* Belt buckle */}
            <mesh position={[0, 0.3, 0.78]} castShadow receiveShadow>
              <boxGeometry args={[0.15, 0.1, 0.03]} />
              <meshStandardMaterial 
                color="#ffd700" 
                metalness={0.9} 
                roughness={0.1}
              />
            </mesh>

            {/* Button details */}
            {[-0.05, 0.05].map((offset, index) => (
              <group key={index}>
                <mesh position={[offset, 1.8, 0.76]} castShadow receiveShadow>
                  <cylinderGeometry args={[0.03, 0.03, 0.02, 8]} />
                  <meshStandardMaterial 
                    color="#ffffff" 
                    metalness={0.2} 
                    roughness={0.3}
                  />
                </mesh>
                <mesh position={[offset, 1.5, 0.76]} castShadow receiveShadow>
                  <cylinderGeometry args={[0.03, 0.03, 0.02, 8]} />
                  <meshStandardMaterial 
                    color="#ffffff" 
                    metalness={0.2} 
                    roughness={0.3}
                  />
                </mesh>
                <mesh position={[offset, 1.2, 0.76]} castShadow receiveShadow>
                  <cylinderGeometry args={[0.03, 0.03, 0.02, 8]} />
                  <meshStandardMaterial 
                    color="#ffffff" 
                    metalness={0.2} 
                    roughness={0.3}
                  />
                </mesh>
              </group>
            ))}

            {/* Dress hem detail */}
            <mesh position={[0, -1.6, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[1.42, 1.42, 0.05, 24]} />
              <meshStandardMaterial 
                color="#000000" 
                metalness={0.1} 
                roughness={0.8}
                transparent={true}
                opacity={0.3}
              />
            </mesh>

            {/* Fabric texture lines */}
            {[0.2, 0.5, 0.8, 1.1].map((yPos, index) => (
              <mesh key={index} position={[0, yPos, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.77 - (index * 0.05), 0.77 - (index * 0.05), 0.02, 24]} />
                <meshStandardMaterial 
                  color={item.color} 
                  metalness={0.05} 
                  roughness={0.1}
                  transparent={true}
                  opacity={0.4}
                />
              </mesh>
            ))}
          </group>
        );

      case 'handbag':
        return (
          <group>
            {/* Main bag body */}
            <mesh position={[0, 0, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.5, 1, 0.8]} />
              <meshStandardMaterial
                color={item.color}
                metalness={0.2}
                roughness={0.1}
              />
            </mesh>
            {/* Handle */}
            <mesh position={[0, 0.8, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
              <torusGeometry args={[0.8, 0.05, 8, 16]} />
              <meshStandardMaterial color="#8b4513" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Clasp */}
            <mesh position={[0, 0.5, 0.45]} castShadow receiveShadow>
              <boxGeometry args={[0.3, 0.1, 0.1]} />
              <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Side details */}
            <mesh position={[0.7, 0, 0.45]} castShadow receiveShadow>
              <boxGeometry args={[0.1, 0.8, 0.1]} />
              <meshStandardMaterial color="#654321" metalness={0.5} roughness={0.3} />
            </mesh>
            <mesh position={[-0.7, 0, 0.45]} castShadow receiveShadow>
              <boxGeometry args={[0.1, 0.8, 0.1]} />
              <meshStandardMaterial color="#654321" metalness={0.5} roughness={0.3} />
            </mesh>
          </group>
        );

      case 'shoes':
        return (
          <group>
            {/* Left shoe */}
            <group position={[-0.6, 0, 0]}>
              {/* Sole */}
              <mesh position={[0, -0.8, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.8, 0.2, 1.2]} />
                <meshStandardMaterial color="#2c2c2c" metalness={0.1} roughness={0.8} />
              </mesh>
              {/* Upper */}
              <mesh position={[0, -0.4, 0.1]} scale={[0.8, 0.8, 1.2]} castShadow receiveShadow>
                <sphereGeometry args={[0.5, 16, 8]} />
                <meshStandardMaterial
                  color={item.color}
                  metalness={0.2}
                  roughness={0.1}
                />
              </mesh>
              {/* Heel */}
              <mesh position={[0, -1.2, -0.4]} castShadow receiveShadow>
                <cylinderGeometry args={[0.1, 0.15, 0.8, 8]} />
                <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.1} />
              </mesh>
            </group>

            {/* Right shoe */}
            <group position={[0.6, 0, 0]}>
              {/* Sole */}
              <mesh position={[0, -0.8, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.8, 0.2, 1.2]} />
                <meshStandardMaterial color="#2c2c2c" metalness={0.1} roughness={0.8} />
              </mesh>
              {/* Upper */}
              <mesh position={[0, -0.4, 0.1]} scale={[0.8, 0.8, 1.2]} castShadow receiveShadow>
                <sphereGeometry args={[0.5, 16, 8]} />
                <meshStandardMaterial
                  color={item.color}
                  metalness={0.2}
                  roughness={0.1}
                />
              </mesh>
              {/* Heel */}
              <mesh position={[0, -1.2, -0.4]} castShadow receiveShadow>
                <cylinderGeometry args={[0.1, 0.15, 0.8, 8]} />
                <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.1} />
              </mesh>
            </group>
          </group>
        );

      default:
        return (
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color={item.color}
              metalness={0.2}
              roughness={0.1}
            />
          </mesh>
        );
    }
  };

  return (
    <group ref={groupRef}>
      {renderModel()}
    </group>
  );
};

export default Fashion3DModel;
