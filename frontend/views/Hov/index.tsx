"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, useTexture } from "@react-three/drei";
// import * as THREE from "three";
import { Suspense } from "react";
import { useState } from "react";

function Room() {
  const walls = useTexture("/walls.jpg");
  const floor = useTexture("/procelain.jpg");
  const roof = useTexture("/ceiling.jpg");

  const width = 22;
  const height = 12;
  const depth = 30;

  return (
    <>
      {/* Front Wall */}
      <mesh position={[0, 0, depth / 2]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial map={walls} />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 0, -depth / 2]}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial map={walls} />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-width / 2, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[depth, height]} />
        <meshStandardMaterial map={walls} />
      </mesh>

      {/* Right Wall */}
      <mesh position={[width / 2, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[depth, height]} />
        <meshStandardMaterial map={walls} />
      </mesh>

      {/* Floor */}
      <mesh position={[0, -height / 2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial map={floor} />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, height / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial map={roof} />
      </mesh>
    </>
  );
}

function Frame({
  position = [0, 0, 0],
  imageUrl,
  Iname,
  country,
}: {
  position: [number, number, number];
  imageUrl: string;
  Iname: string;
  country: string;
}) {
  const texture = useTexture(imageUrl);
  const [hovered, setHovered] = useState(false);

  const imageSize = 2; // Increased from 1 → 2
  const borderSize = 2.2; // Slightly bigger frame, increased proportionally

  return (
    <group position={position}>
      {/* Frame behind the image */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[borderSize, borderSize]} />
        <meshBasicMaterial color="black" />
      </mesh>
      {/* The image itself */}
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <planeGeometry args={[imageSize, imageSize]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      {hovered && (
        <Html position={[0.2, 2, 0]} center className="pointer-events-none">
          <div
            style={{
              backgroundColor: "black",
              padding: "0.25rem 0.5rem",
              borderRadius: "4px",
            }}
          >
            <p
              style={{
                // backgroundColor: "red",
                color: "white",
                fontSize: "12px",
                whiteSpace: "nowrap",
                textAlign: "center",
              }}
            >
              {Iname}
              <br /> {country}
            </p>
          </div>
        </Html>
      )}
    </group>
  );
}

function BrickWallScene() {
  return (
    <>
      {/* Room */}
      <Room />

      {/* Frames on back wall */}
      {/* column 1 */}
      <Frame
        position={[-9, 2.5, -14.9]}
        imageUrl="/assets/nawal-sadami.jpeg"
        Iname="Nawal Sadawi"
        country="Egypt"
      />
      <Frame
        position={[-9, 0.1, -14.9]}
        imageUrl="/assets/ilwad-elman.jpg"
        Iname="Ilwad ELman"
        country="Egypt"
      />
      <Frame
        position={[-9, -2.3, -14.9]}
        imageUrl="/assets/makemba.jpeg"
        Iname="Miriam Makemba"
        country="South-Africa"
      />
      {/* column 2 */}
      <Frame
        position={[-6.4, 2.5, -14.9]}
        imageUrl="/assets/ngozi-iweala.jpg"
        Iname="Ngozi Iweala"
        country="Nigeria"
      />
      <Frame
        position={[-6.4, 0.1, -14.9]}
        imageUrl="/assets/yaa-asantewa.webp"
        Iname="Nawal Sadawi"
        country="Egypt"
      />
      <Frame
        position={[-6.4, -2.3, -14.9]}
        imageUrl="/assets/charlotte-maxeke.jpeg"
        Iname="Charlotte Maxeke"
        country="South-Africa"
      />
      {/* column 3 */}
      <Frame
        position={[-3.8, 2.5, -14.9]}
        imageUrl="/assets/adadevoh.jpeg"
        Iname="Nawal Adedevoh"
        country="Nigeria"
      />
      <Frame
        position={[-3.8, 0.1, -14.9]}
        imageUrl="/assets/ama-ataido.jpeg"
        Iname="Nawal Sadawi"
        country="Ghana"
      />
      <Frame
        position={[-3.8, -2.3, -14.9]}
        imageUrl="/assets/julienne-lusenge.webp"
        Iname="Nawal Sadawi"
        country="Egypt"
      />
      {/* column 4 */}
      <Frame
        position={[-1.3, 2.5, -14.9]}
        imageUrl="/assets/sirLeaf.jpg"
        Iname="Ellen Sirleaf"
        country="Liberia"
      />
      <Frame
        position={[-1.3, 0.1, -14.9]}
        imageUrl="/assets/tsitsi-dangaremba.jpeg"
        Iname="Nawal Sadawi"
        country="Egypt"
      />
      {/* column 5 */}
      <Frame
        position={[1.3, 2.5, -14.9]}
        imageUrl="/assets/makemba.jpeg"
        Iname="Nawal Sadawi"
        country="Egypt"
      />
      <Frame
        position={[1.3, 0.1, -14.9]}
        imageUrl="/assets/fatou-bensouda.jpg"
        Iname="Nawal Sadawi"
        country="Egypt"
      />
      {/* column 6 */}
      <Frame
        position={[3.8, 2.5, -14.9]}
        imageUrl="/assets/adiche.jpg"
        Iname="Chimamanda Adichie"
        country="Nigeria"
      />
      <Frame
        position={[3.8, 0.1, -14.9]}
        imageUrl="/assets/ala-salah.avif"
        Iname="Nawal Sadawi"
        country="Egypt"
      />
      {/* column 7 */}
      <Frame
        position={[6.4, 2.5, -14.9]}
        imageUrl="/assets/amel-kabourl.jpg"
        Iname="Nawal Sadawi"
        country="Egypt"
      />
      <Frame
        position={[6.4, 0.1, -14.9]}
        imageUrl="/assets/funmi-kuti.jpeg"
        Iname="Nawal Sadawi"
        country="Egypt"
      />
      {/* column 8 */}
      <Frame
        position={[9, 2.5, -14.9]}
        imageUrl="/assets/joyce-Banda.jpg"
        Iname="Nawal Sadawi"
        country="Egypt"
      />
      <Frame
        position={[9, 0.1, -14.9]}
        imageUrl="/assets/wangari2.jpeg"
        Iname="Nawal Sadawi"
        country="Egypt"
      />

      {/* Lights */}
      <ambientLight intensity={1.2} />
      <pointLight position={[0, 5, 2]} intensity={1} />
    </>
  );
}

export default function HallOfVoices() {
  return (
    <div className="w-full h-screen">
      <Canvas camera={{ position: [0, 1.5, 6], fov: 60 }}>
        <Suspense fallback={null}>
          <OrbitControls
            enablePan={false}
            minDistance={0.01}
            maxDistance={10}
            enableZoom={true}
            zoomSpeed={0.2}
            rotateSpeed={0.2}
          />
          <BrickWallScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
