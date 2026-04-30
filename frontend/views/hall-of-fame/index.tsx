"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, useTexture } from "@react-three/drei";
// import * as THREE from "three";
import { Suspense } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
  slug,
  onNavigate,
}: {
  position: [number, number, number];
  imageUrl: string;
  Iname: string;
  country: string;
  slug?: string;
  onNavigate?: (slug: string) => void;
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
        onClick={() => slug && onNavigate && onNavigate(slug)}
      >
        <planeGeometry args={[imageSize, imageSize]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      {hovered && (
        <Html position={[0.2, 2, 0]} center className="pointer-events-none">
          <div
            style={{
              backgroundColor: "black",
              padding: "0.25rem 0.75rem",
              borderRadius: "4px",
            }}
          >
            <p
              style={{
                color: "white",
                fontSize: "12px",
                whiteSpace: "nowrap",
                textAlign: "center",
              }}
            >
              {Iname}
              <br />
              <span style={{ color: "#AD4A00", fontSize: "11px" }}>
                {country}
              </span>
              {slug && (
                <span
                  style={{
                    display: "block",
                    color: "#9FE1CB",
                    fontSize: "10px",
                    marginTop: "2px",
                  }}
                >
                  click to read her story
                </span>
              )}
            </p>
          </div>
        </Html>
      )}
    </group>
  );
}

function BrickWallScene({
  onNavigate,
}: {
  onNavigate: (slug: string) => void;
}) {
  return (
    <>
      {/* Room */}
      <Room />

      {/* Frames on back wall */}
      {/* column 1 */}
      {/* column 1 */}
      <>
        <Room />

        {/* column 1 */}
        <Frame
          position={[-9, 2.5, -14.9]}
          imageUrl="/assets/nawal-sadami.jpeg"
          Iname="Nawal El-Saadawi"
          country="Egypt"
          slug="nawal-el-saadawi"
          onNavigate={onNavigate}
        />
        <Frame
          position={[-9, 0.1, -14.9]}
          imageUrl="/assets/ilwad-elman.jpg"
          Iname="Ilwad Elman"
          country="Somalia"
          slug="ilwad-elman"
          onNavigate={onNavigate}
        />
        <Frame
          position={[-9, -2.3, -14.9]}
          imageUrl="/assets/makemba.jpeg"
          Iname="Miriam Makeba"
          country="South Africa"
          slug="miriam-makeba"
          onNavigate={onNavigate}
        />

        {/* column 2 */}
        <Frame
          position={[-6.4, 2.5, -14.9]}
          imageUrl="/assets/ngozi-iweala.jpg"
          Iname="Ngozi Okonjo-Iweala"
          country="Nigeria"
          slug="ngozi-okonjo-iweala"
          onNavigate={onNavigate}
        />
        <Frame
          position={[-6.4, 0.1, -14.9]}
          imageUrl="/assets/yaa-asantewa.webp"
          Iname="Yaa Asantewaa"
          country="Ghana"
          onNavigate={onNavigate}
        />
        <Frame
          position={[-6.4, -2.3, -14.9]}
          imageUrl="/assets/charlotte-maxeke.jpeg"
          Iname="Charlotte Maxeke"
          country="South Africa"
          slug="charlotte-maxeke"
          onNavigate={onNavigate}
        />

        {/* column 3 */}
        <Frame
          position={[-3.8, 2.5, -14.9]}
          imageUrl="/assets/adadevoh.jpeg"
          Iname="Ameyo Adadevoh"
          country="Nigeria"
          slug="fumilayo-adadevoh"
          onNavigate={onNavigate}
        />
        <Frame
          position={[-3.8, 0.1, -14.9]}
          imageUrl="/assets/ama-ataido.jpeg"
          Iname="Ama Ata Aidoo"
          country="Ghana"
          slug="ama-ata-aidoo"
          onNavigate={onNavigate}
        />
        <Frame
          position={[-3.8, -2.3, -14.9]}
          imageUrl="/assets/julienne-lusenge.webp"
          Iname="Julienne Lusenge"
          country="DRC"
          slug="julienne-lusenge"
          onNavigate={onNavigate}
        />

        {/* column 4 */}
        <Frame
          position={[-1.3, 2.5, -14.9]}
          imageUrl="/assets/sirleaf.jpg"
          Iname="Ellen Johnson Sirleaf"
          country="Liberia"
          slug="ellen-johnson-sirleaf"
          onNavigate={onNavigate}
        />
        <Frame
          position={[-1.3, 0.1, -14.9]}
          imageUrl="/assets/tsitsi-dangaremba.jpeg"
          Iname="Tsitsi Dangarembga"
          country="Zimbabwe"
          slug="tsitsi-dangarembga"
          onNavigate={onNavigate}
        />

        {/* column 5 */}
        <Frame
          position={[1.3, 2.5, -14.9]}
          imageUrl="/assets/makemba.jpeg"
          Iname="Miriam Makeba"
          country="South Africa"
          slug="miriam-makeba"
          onNavigate={onNavigate}
        />
        <Frame
          position={[1.3, 0.1, -14.9]}
          imageUrl="/assets/fatou-bensouda.jpg"
          Iname="Fatou Bensouda"
          country="Gambia"
          slug="fatou-bensouda"
          onNavigate={onNavigate}
        />

        {/* column 6 */}
        <Frame
          position={[3.8, 2.5, -14.9]}
          imageUrl="/assets/adiche.jpg"
          Iname="Chimamanda Ngozi Adichie"
          country="Nigeria"
          slug="chimamanda-ngozi-adichie"
          onNavigate={onNavigate}
        />
        <Frame
          position={[3.8, 0.1, -14.9]}
          imageUrl="/assets/ala-salah.avif"
          Iname="Ala Salah"
          country="Sudan"
          slug="ala-salah"
          onNavigate={onNavigate}
        />

        {/* column 7 */}
        <Frame
          position={[6.4, 2.5, -14.9]}
          imageUrl="/assets/amel-kabourl.jpg"
          Iname="Amel Karboul"
          country="Tunisia"
          slug="amel-karboul"
          onNavigate={onNavigate}
        />
        <Frame
          position={[6.4, 0.1, -14.9]}
          imageUrl="/assets/funmi-kuti.jpeg"
          Iname="Funmilayo Ransome-Kuti"
          country="Nigeria"
          slug="funmilayo-ransome-kuti"
          onNavigate={onNavigate}
        />

        {/* column 8 */}
        <Frame
          position={[9, 2.5, -14.9]}
          imageUrl="/assets/joyce-banda.jpg"
          Iname="Joyce Banda"
          country="Malawi"
          slug="joyce-banda"
          onNavigate={onNavigate}
        />
        <Frame
          position={[9, 0.1, -14.9]}
          imageUrl="/assets/wangari2.jpeg"
          Iname="Wangari Maathai"
          country="Kenya"
          slug="wangari-maathai"
          onNavigate={onNavigate}
        />

        <ambientLight intensity={1.2} />
        <pointLight position={[0, 5, 2]} intensity={1} />
      </>

      {/* Lights */}
      <ambientLight intensity={1.2} />
      <pointLight position={[0, 5, 2]} intensity={1} />
    </>
  );
}

export default function HallOfVoices() {
  const router = useRouter();

  return (
    <div className="w-full" style={{ height: "calc(100vh - 80px)" }}>
      <Canvas camera={{ position: [0, 1.5, 6], fov: 60 }}>
        <Suspense
          fallback={
            <Html center>
              <div
                style={{
                  color: "purple",
                  fontSize: "3rem",
                  letterSpacing: "0.1em",
                }}
              >
                Loading...
              </div>
            </Html>
          }
        >
          <OrbitControls
            enablePan={false}
            minDistance={0.01}
            maxDistance={10}
            enableZoom={true}
            zoomSpeed={0.2}
            rotateSpeed={0.2}
          />
          <BrickWallScene
            onNavigate={(slug) => router.push(`/biography/${slug}`)}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
