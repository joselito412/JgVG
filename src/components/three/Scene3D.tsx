"use client"

import { Suspense, useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Html, ContactShadows, Float, useTexture } from "@react-three/drei"
import * as THREE from "three"

// Avatar en Pixel Art (Sprite / 2.5D)
// Carga la textura desde public/models/avatar_v2.jpg
function AvatarSprite({ url = "/models/avatar_v2.jpg" }: { url?: string }) {
  const [imgError, setImgError] = useState(false)
  const meshRef = useRef<THREE.Mesh>(null)
  
  // Verificamos si la imagen existe
  useEffect(() => {
    fetch(url, { method: 'HEAD' })
      .then(res => {
        if (!res.ok) setImgError(true)
      })
      .catch(() => setImgError(true))
  }, [url])

  // Placeholder si la imagen no existe
  if (imgError) {
    return (
      <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
        <mesh position={[0, 1.5, 0]} castShadow>
          <planeGeometry args={[2, 2]} />
          <meshStandardMaterial color="#f5a623" wireframe side={THREE.DoubleSide} />
          <Html position={[0, 0, 0]} center>
            <div className="bg-[#000080] text-white font-[family-name:var(--font-pixel)] text-xs px-2 py-1 border-2 border-white whitespace-nowrap text-center">
              Falta Imagen <br/> public/models/avatar_v2.jpg
            </div>
          </Html>
        </mesh>
      </Float>
    )
  }

  return (
    <Suspense fallback={<Loader />}>
      <SpriteActual url={url} meshRef={meshRef} />
    </Suspense>
  )
}

// Componente que efectivamente carga y renderiza la textura
function SpriteActual({ url, meshRef }: { url: string, meshRef: React.RefObject<THREE.Mesh | null> }) {
  const loadedTexture = useTexture(url)
  
  // Clonamos la textura para no mutar directamente el retorno del hook (Evita error de inmutabilidad)
  const texture = loadedTexture.clone()
  
  // Ajuste CRÍTICO para Pixel Art: Desactivar antialiasing de textura para que se vea rudo y pixel perfect
  texture.minFilter = THREE.NearestFilter
  texture.magFilter = THREE.NearestFilter
  texture.needsUpdate = true

  // Leve animación de respiración al sprite
  useFrame((state) => {
    if (meshRef.current) {
      // Movimiento vertical suave "Idle"
      meshRef.current.position.y = 1.3 + Math.sin(state.clock.elapsedTime * 2) * 0.05
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 1.3, 0]} castShadow receiveShadow>
      {/* Geometría Plana. El tamaño lo escalamos para eliminar espacio vacío perimetral inútil */}
      <planeGeometry args={[3.2, 3.2]} />
      
      {/* Material Básico: Muestra los colores RAW de la imagen, sin ser afectado u oscurecido por las luces de la escena */}
      <meshBasicMaterial 
        map={texture} 
        transparent={true} 
        alphaTest={0.5} 
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

function Loader() {
  return (
    <Html center>
      <div className="font-[family-name:var(--font-pixel)] text-[#88ff88] animate-pulse whitespace-nowrap bg-black/50 p-2 border border-[#88ff88]">
        Invocando Sprite...
      </div>
    </Html>
  )
}

// Escena principal 3D/2.5D
export default function Scene3D() {
  return (
    <div className="w-full h-full relative cursor-default">
      <Canvas shadows camera={{ position: [0, 1.3, 3.5], fov: 45 }}>
        {/* Iluminación tipo RPG. Una luz clave cálida (legal) y un rim light (tech) */}
        <ambientLight intensity={0.6} />
        
        {/* Luz Cálida - Lado Legal */}
        <directionalLight 
          position={[5, 2, 3]} 
          intensity={1.2} 
          color="#ffd700" 
          castShadow 
          shadow-mapSize={[1024, 1024]}
        />
        
        {/* Luz Fría / Cyber - Lado Dev */}
        <spotLight 
          position={[-5, 3, 2]} 
          intensity={2.5} 
          color="#00d9ff" 
          distance={15} 
          penumbra={1}
          angle={0.6}
        />

        {/* El Personaje 2D Pixel Art */}
        <AvatarSprite />

        {/* Sombras suaves de contacto bajo el sprite */}
        <ContactShadows position={[0, -0.4, 0]} opacity={0.6} scale={5} blur={2.5} far={2} color="#000000" />

        {/* Controles estáticos: Forzamos la mirada (target) al centro exacto de la imagen y desactivamos interacciones */}
        <OrbitControls 
          target={[0, 1.3, 0]}
          enablePan={false} 
          enableZoom={false}
          enableRotate={false}
        />
      </Canvas>
    </div>
  )
}

// Precargar el modelo por defecto si existe (opcional)
// useGLTF.preload("/models/avatar.glb")
