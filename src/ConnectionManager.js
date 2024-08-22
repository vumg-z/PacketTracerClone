import * as THREE from 'three';
import { scene } from './SceneSetup.js';

const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });

export function connectDevices(device1, device2) {
    if (!device1 || !device2) {
        console.error('Invalid devices:', device1, device2);
        return;
    }

    console.log('Connection made between:', device1.name, device2.name);

    const points = [];
    points.push(device1.position.clone());
    points.push(device2.position.clone());

    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(line);

    // Store reference to the line in each device
    device1.connectedLines = device1.connectedLines || [];
    device2.connectedLines = device2.connectedLines || [];
    device1.connectedLines.push({ line, connectedDevice: device2 });
    device2.connectedLines.push({ line, connectedDevice: device1 });
}

export function updateConnectedLines(device) {
    if (!device.connectedLines) return;

    device.connectedLines.forEach(connection => {
        const { line, connectedDevice } = connection;

        const positions = line.geometry.attributes.position.array;
        positions[0] = device.position.x;
        positions[1] = device.position.y;
        positions[2] = device.position.z;

        positions[3] = connectedDevice.position.x;
        positions[4] = connectedDevice.position.y;
        positions[5] = connectedDevice.position.z;

        line.geometry.attributes.position.needsUpdate = true;
    });
}
