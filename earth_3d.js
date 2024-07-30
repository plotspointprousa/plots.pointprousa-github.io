import * as THREE from 'three';
import { OrbitControls } from 'jsm/controls/OrbitControls.js';
import getStarfield from './getStarfield.js';

const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);
const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 5;
const scene = new THREE.Scene();

const earthGroup = new THREE.Group();
earthGroup.rotation.z = 0 * 23.4 * Math.PI / 180;
scene.add(earthGroup);
const controls = new OrbitControls(camera, renderer.domElement);
const loader = new THREE.TextureLoader();
const geometry = new THREE.SphereGeometry(1.01, 64, 64);
const material = new THREE.MeshStandardMaterial({
    map: loader.load('earth.jpg'),
});

const earthMesh = new THREE.Mesh(geometry, material);
earthGroup.add(earthMesh);

function addCountryCoord(earth, latitude, longitude, name) {
    const pointOfInterest = new THREE.SphereGeometry(0.005, 32, 32);
    const lat = latitude * (Math.PI / 180);
    const lon = -longitude * (Math.PI / 180);
    const radius = 1.01;
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    const material = new THREE.MeshBasicMaterial({ color: 0x23238E });
    const mesh = new THREE.Mesh(pointOfInterest, material);

    mesh.position.set(
        Math.cos(lat) * Math.cos(lon) * radius,
        Math.sin(lat) * radius,
        Math.cos(lat) * Math.sin(lon) * radius
    );

    mesh.rotation.set(0.0, -lon, lat - Math.PI * 0.5);
    earth.add(mesh);
    
    addLabel(name, mesh.position);
}

function addLabel(text, position) {
    const canvas = createTextCanvas(text);
    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.needsUpdate = true;

    const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.position.copy(position);
    sprite.position.multiplyScalar(1.05); 
    sprite.scale.set(0.3, 0.15, 1); 

    scene.add(sprite);
}

function createTextCanvas(text) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 256;
    canvas.height = 128;
    context.font = '12px Arial';
    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillText(text, canvas.width / 2, canvas.height / 2);
    return canvas;
}

const cities = [
    { lat: 51.507351, long: -0.127758, name: 'London' },
    { lat: 35.689487, long: 139.691711, name: 'Tokyo' },
    { lat: -33.868820, long: 151.209290, name: 'Sydney' },
    { lat: 48.856613, long: 2.352222, name: 'Paris' },
    { lat: 55.755825, long: 37.617298, name: 'Moscow' },
    { lat: 19.432608, long: -99.133209, name: 'Mexico City' },
    { lat: 28.613939, long: 77.209023, name: 'New Delhi' },
    { lat: -23.550520, long: -46.633308, name: 'São Paulo' },
    { lat: 40.712776, long: -74.005974, name: 'New York' },
    { lat: 34.052235, long: -118.243683, name: 'Los Angeles' },
    { lat: 41.878113, long: -87.629799, name: 'Chicago' },
    { lat: 29.760427, long: -95.369804, name: 'Houston' },
    { lat: 33.448376, long: -112.074036, name: 'Phoenix' },
    { lat: 39.739235, long: -104.990250, name: 'Denver' },
    { lat: 47.606209, long: -122.332069, name: 'Seattle' },
    { lat: 25.761680, long: -80.191790, name: 'Miami' },
    { lat: 38.907192, long: -77.036873, name: 'Washington, D.C.' },
    { lat: 37.774929, long: -122.419418, name: 'San Francisco' },
    { lat: 32.715736, long: -117.161087, name: 'San Diego' },
    { lat: 29.424122, long: -98.493629, name: 'San Antonio' },
    { lat: 32.776665, long: -96.796989, name: 'Dallas' },
    { lat: 30.267153, long: -97.743057, name: 'Austin' },
    { lat: 39.952583, long: -75.165222, name: 'Philadelphia' },
    { lat: 42.360081, long: -71.058884, name: 'Boston' },
    { lat: 36.162663, long: -86.781601, name: 'Nashville' },
    { lat: 35.227085, long: -80.843124, name: 'Charlotte' },
    { lat: 36.169941, long: -115.139832, name: 'Las Vegas' },
    { lat: 52.520008, long: 13.404954, name: 'Berlin' },
    { lat: 40.730610, long: -73.935242, name: 'New York City' },
    { lat: 43.653225, long: -79.383186, name: 'Toronto' },
    { lat: 39.904202, long: 116.407394, name: 'Beijing' },
    { lat: 34.052235, long: -118.243683, name: 'Los Angeles' },
    { lat: 55.953252, long: -3.188267, name: 'Edinburgh' },
    { lat: 37.566536, long: 126.977968, name: 'Seoul' },
    { lat: 59.934280, long: 30.335099, name: 'Saint Petersburg' },
    { lat: 22.319303, long: 114.169361, name: 'Hong Kong' },
    { lat: -34.603722, long: -58.381592, name: 'Buenos Aires' },
    { lat: -26.204103, long: 28.047305, name: 'Johannesburg' },
    { lat: 48.208174, long: 16.373819, name: 'Vienna' },
    { lat: 50.850346, long: 4.351721, name: 'Brussels' },
    { lat: 41.902782, long: 12.496366, name: 'Rome' },
    { lat: 52.229676, long: 21.012229, name: 'Warsaw' },
    { lat: 31.549333, long: 74.343611, name: 'Lahore' },
    { lat: 40.416775, long: -3.703790, name: 'Madrid' },
    { lat: 55.676098, long: 12.568337, name: 'Copenhagen' },
    { lat: 37.983810, long: 23.727539, name: 'Athens' },
    { lat: 1.352083, long: 103.819836, name: 'Singapore' },
    { lat: -22.906847, long: -43.172897, name: 'Rio de Janeiro' },
    { lat: -12.046374, long: -77.042793, name: 'Lima' },
    { lat: 19.076090, long: 72.877426, name: 'Mumbai' },
    { lat: 4.610628, long: -74.081749, name: 'Bogotá' },
    { lat: 39.904202, long: 116.407394, name: 'Beijing' },
    { lat: 18.520430, long: 73.856743, name: 'Pune' },
    { lat: 37.774929, long: -122.419418, name: 'San Francisco' },
    { lat: 23.810310, long: 90.412521, name: 'Dhaka' },
    { lat: 30.044420, long: 31.235712, name: 'Cairo' },
    { lat: 44.426767, long: 26.102538, name: 'Bucharest' },
    { lat: 39.961176, long: -82.998795, name: 'Columbus' }
];


cities.forEach(city => {
    addCountryCoord(earthMesh, city.lat, city.long, city.name);
});

async function readCoordinatesFromFile() {
    try {
        const response = await fetch('pos.txt'); 
        if (!response.ok) {
            throw new Error('Failed to load pos.txt');
        }
        const text = await response.text();
        const lines = text.trim().split('\n');
        const coordinates = lines.map(line => {
            const [xc, yc, zc] = line.split(',').map(Number);
            const curve = new THREE.SplineCurve([new THREE.Vector3(xc, yc, zc)]);
            const splinePoints = curve.getPoints(50);
            const splineGeometry = new THREE.BufferGeometry().setFromPoints(splinePoints);
            const splineMaterial = new THREE.LineBasicMaterial({ color: 0xd1d73d });
            const splineObject = new THREE.Line(splineGeometry, splineMaterial);
            scene.add(splineObject);
            return { xc, yc, zc };
        });
        return coordinates;
    } catch (error) {
        console.error('Error reading coordinates:', error);
        return [];
    }
}

function calculateStats(coordinates) {
    const RADIUS = 6378.14; 

    let maxHeight = -Infinity;
    let minHeight = Infinity;
    let firstPoint = null;
    let lastPoint = null;

    let totalDistance = 0; 

    coordinates.forEach(({ xc, yc, zc }, index) => {
        const x = xc / RADIUS;
        const y = zc / RADIUS;
        const z = -yc / RADIUS;

        const norm = Math.sqrt(xc * xc + yc * yc + zc * zc);
        const height = norm - RADIUS;

        maxHeight = Math.max(maxHeight, height);
        minHeight = Math.min(minHeight, height);

        if (index === 0) {
            firstPoint = { x, y, z };
        }
        lastPoint = { x, y, z };

        if (index > 0) {
            const prevPoint = coordinates[index - 1];
            const prevX = prevPoint.xc / RADIUS;
            const prevY = prevPoint.zc / RADIUS;
            const prevZ = -prevPoint.yc / RADIUS;

            const dx = x - prevX;
            const dy = y - prevY;
            const dz = z - prevZ;
            totalDistance += Math.sqrt(dx * dx + dy * dy + dz * dz) * RADIUS;
        }
    });

    let LoSDistance = 0;
    if (firstPoint && lastPoint) {
        const dx = lastPoint.x - firstPoint.x;
        const dy = lastPoint.y - firstPoint.y;
        const dz = lastPoint.z - firstPoint.z;
        LoSDistance = Math.sqrt(dx * dx + dy * dy + dz * dz) * RADIUS;
    }

    return {
        maxHeight,
        minHeight,
        LoSDistance,
        totalDistance 
    };
}

async function plotCoordinatesFromFile() {
    const coordinates = await readCoordinatesFromFile();
    const vertices = [];
    
    const stats = calculateStats(coordinates);

    coordinates.forEach(({ xc, yc, zc }) => {
        const x = xc / 6378;
        const y = zc / 6378;
        const z = -yc / 6378;
        vertices.push(x, y, z);
        const markerGeometry = new THREE.SphereGeometry(0.01, 16, 16);
        const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xd1d73d });
        const marker = new THREE.Mesh(markerGeometry, markerMaterial);
        marker.position.set(x, y, z);
        scene.add(marker);
    });

    const lineGeometry = new THREE.BufferGeometry();
    const verticesFloatArray = new Float32Array(vertices);
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(verticesFloatArray, 3));
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: 10 });
    const line = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(line);

    document.getElementById('stats').innerHTML = `
        <strong>Trajectory Stats:</strong><br>
        Max Height: ${stats.maxHeight.toFixed(2)} km<br>
        Min Height: ${stats.minHeight.toFixed(2)} km<br>
        End-End LoS Distance: ${stats.LoSDistance.toFixed(2)} km<br>
        Total Distance: ${stats.totalDistance.toFixed(2)} km
    `;
}
plotCoordinatesFromFile();

const lightsMat = new THREE.MeshStandardMaterial({
    map: loader.load('8081_earthlights4k.jpg'),
    blending: THREE.AdditiveBlending,
});
const lightsMesh = new THREE.Mesh(geometry, lightsMat);
const stars = getStarfield({ numStars: 200 });
scene.add(stars);

const starGeometry = new THREE.SphereGeometry(900, 256, 256);
const starTexture = loader.load('milkyway_map.jpg');
const starMaterial = new THREE.MeshStandardMaterial({
    map: starTexture,
    side: THREE.BackSide
});
starMaterial.map.colorSpace = THREE.SRGBColorSpace;
const starMesh = new THREE.Mesh(starGeometry, starMaterial);
scene.add(starMesh);

const ambientLight = new THREE.AmbientLight(0x404040);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
scene.add(ambientLight);
scene.add(directionalLight);

function updateLightPosition() {
    directionalLight.position.copy(camera.position).normalize();
    directionalLight.target.position.copy(camera.position).normalize(); 
}

function createTimeBox() {
    const timeBox = document.createElement('div');
    timeBox.style.position = 'absolute';
    timeBox.style.top = '10px';
    timeBox.style.right = '10px';
    timeBox.style.padding = '10px';
    timeBox.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    timeBox.style.color = 'white';
    timeBox.style.fontFamily = 'Arial, sans-serif';
    timeBox.style.fontSize = '14px';
    document.body.appendChild(timeBox);
    return timeBox;
}

const timeBox = createTimeBox();
function updateTimeBox() {
    const now = new Date();

    const utcTimeFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'UTC',
        dateStyle: 'long',
        timeStyle: 'long'
    });
    const utcTime = utcTimeFormatter.format(now);

    const mountainTimeFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Denver',
        dateStyle: 'long',
        timeStyle: 'long'
    });
    const mountainTime = mountainTimeFormatter.format(now);

    const estTimeFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/New_York',
        dateStyle: 'long',
        timeStyle: 'long'
    });
    const estTime = estTimeFormatter.format(now);

    timeBox.innerHTML = `Current Time:<br>${utcTime}<br>${mountainTime}<br>${estTime}`;
}
setInterval(updateTimeBox, 1000);

const rotationStep = 0.05;
const zoomStep = 0.1;
function rotateOrZoomCamera(event) {
    if (event.ctrlKey) {
        switch (event.keyCode) {
            case 37: // Ctrl + left arrow key
                camera.position.x -= rotationStep;
                break;
            case 38: // Ctrl + up arrow key
                camera.position.z -= zoomStep;
                break;
            case 39: // Ctrl + right arrow key
                camera.position.x += rotationStep;
                break;
            case 40: // Ctrl + down arrow key
                camera.position.z += zoomStep;
                break;
        }
    } else {
        switch (event.keyCode) {
            case 37: // left arrow key
                camera.position.x -= rotationStep;
                break;
            case 38: // up arrow key
                camera.position.y += rotationStep;
                break;
            case 39: // right arrow key
                camera.position.x += rotationStep;
                break;
            case 40: // down arrow key
                camera.position.y -= rotationStep;
                break;
        }
    }
    camera.lookAt(earthGroup.position); 
}
document.addEventListener('keydown', (event) => {
    rotateOrZoomCamera(event);
});


function animate() {
    requestAnimationFrame(animate);
    updateTimeBox(); 
    updateLightPosition()
    renderer.render(scene, camera);
    renderer.autoClear = false;
    renderer.render(scene, camera);
    controls.update();
}
animate();

