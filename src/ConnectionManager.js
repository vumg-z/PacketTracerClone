import * as THREE from 'three';
import { scene } from './SceneSetup.js';

const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
const undoStack = []; // Stack to store undo actions

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

    // Push the connection to the undo stack
    undoStack.push({
        action: 'connect',
        device1,
        device2,
        line
    });
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

export function undoLastAction() {
    if (undoStack.length === 0) {
        console.log('No actions to undo.');
        return;
    }

    const lastAction = undoStack.pop();

    if (lastAction.action === 'connect') {
        const { device1, device2, line } = lastAction;

        // Remove the line from the scene
        scene.remove(line);

        // Remove references from the devices
        device1.connectedLines = device1.connectedLines.filter(conn => conn.line !== line);
        device2.connectedLines = device2.connectedLines.filter(conn => conn.line !== line);

        console.log(`Undo connection between ${device1.name} and ${device2.name}`);
    }
    // You can add more actions here in the future
}
