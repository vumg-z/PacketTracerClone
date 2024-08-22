import * as THREE from 'three';
import { scene } from './SceneSetup.js';

const deviceGeometries = {
    host: new THREE.SphereGeometry(0.5, 32, 32), // Sphere for Host
    switch: new THREE.BoxGeometry(0.5, 0.5, 0.5), // Box for Switch
    router: new THREE.CylinderGeometry(0.3, 0.3, 0.5, 32), // Cylinder for Router
};

const deviceMaterials = {
    host: new THREE.MeshBasicMaterial({ color: 0xff0000 }), // Red for Host
    switch: new THREE.MeshBasicMaterial({ color: 0x0000ff }), // Blue for Switch
    router: new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // Green for Router
};

const devices = [];

// Function to create a text label as a sprite
function createTextLabel(name) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = '30px Arial';
    context.fillStyle = 'black';
    context.fillText(name, 0, 30);

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(spriteMaterial);
    
    sprite.scale.set(2, 1, 1); // Adjust the scale as needed
    return sprite;
}

function addDevice(name, x, y) {
    let geometry, material;

    if (name.includes('host')) {
        geometry = deviceGeometries.host;
        material = deviceMaterials.host;
    } else if (name.includes('switch')) {
        geometry = deviceGeometries.switch;
        material = deviceMaterials.switch;
    } else if (name.includes('router')) {
        geometry = deviceGeometries.router;
        material = deviceMaterials.router;
    } else {
        console.warn('Unknown device type:', name);
        return;
    }

    const device = new THREE.Mesh(geometry, material);
    device.position.set(x, y, 0);
    device.name = name;

    // Create and attach the text label to the device
    const textLabel = createTextLabel(name);
    textLabel.position.set(x, y + 1, 0); // Position the label above the device
    scene.add(textLabel);

    scene.add(device);
    devices.push({ device, textLabel }); // Store the device and its label together

    console.log(`${name} added to the scene.`);
}

export { devices, addDevice };
