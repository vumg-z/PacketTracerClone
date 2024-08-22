import * as THREE from 'three';
import { renderer, camera } from './SceneSetup.js';
import { devices } from './DeviceManager.js'; // Import devices array
import { connectDevices } from './ConnectionManager.js';
import { updateConnectedLines } from './ConnectionManager.js';
import { undoLastAction } from './ConnectionManager.js';

let selectedDevice = null;
let isDragging = false;
let shiftPressed = false;
let hoveredDevice = null;

export function setupMouseEvents() {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });

    window.addEventListener('keydown', (event) => {
        if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
            console.log("Shift key down detected");
            shiftPressed = true;
        }

        if (event.ctrlKey && event.code === 'KeyZ') {
            console.log('Ctrl+Z detected, undoing last action.');
            undoLastAction();
        }
    });

    window.addEventListener('keyup', (event) => {
        if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
            console.log("Shift key up detected");
            shiftPressed = false;
            if (hoveredDevice) {
                hoveredDevice.material.color.set(0x00ff00); // Reset hovered device color
                hoveredDevice = null;
            }
        }
    });

    renderer.domElement.addEventListener('mousedown', (event) => {
        handleMouseDown(event, raycaster, mouse, lineMaterial);
    });

    renderer.domElement.addEventListener('mousemove', (event) => {
        handleMouseMove(event, raycaster, mouse);
    });

    renderer.domElement.addEventListener('mouseup', handleMouseUp);
}

function handleMouseDown(event, raycaster, mouse, lineMaterial) {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(devices.map(d => d.device)); // Access devices array

    if (intersects.length > 0) {
        const intersectedDevice = intersects[0].object;

        if (shiftPressed) {
            if (selectedDevice === null) {
                console.log('First device selected:', intersectedDevice.name);
                selectedDevice = intersectedDevice;
                selectedDevice.material.color.set(0xff0000); // Highlight selected device
            } else if (intersectedDevice !== selectedDevice) {
                console.log('Second device selected:', intersectedDevice.name);
                connectDevices(selectedDevice, intersectedDevice);
                selectedDevice.material.color.set(0x00ff00); // Reset color of selected device
                intersectedDevice.material.color.set(0x00ff00); // Reset color of connected device
                selectedDevice = null; // Reset selection after connection
            }
        } else {
            selectedDevice = intersectedDevice;
            isDragging = true;
            console.log('Device selected for dragging:', selectedDevice.name);
            selectedDevice.material.color.set(0xff0000); // Highlight the device being dragged
        }
    } else {
        console.log('No device intersected.');
        selectedDevice = null;
        isDragging = false;
    }
}

function handleMouseMove(event, raycaster, mouse) {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(devices.map(d => d.device)); // Access devices array

    if (shiftPressed && selectedDevice && intersects.length > 0) {
        const intersectedDevice = intersects[0].object;

        if (intersectedDevice !== selectedDevice && intersectedDevice !== hoveredDevice) {
            if (hoveredDevice) {
                hoveredDevice.material.color.set(0x00ff00); // Reset previously hovered device color
            }
            hoveredDevice = intersectedDevice;
            hoveredDevice.material.color.set(0xffff00); // Highlight the hovered device
            console.log('Hovering over potential second device:', hoveredDevice.name);
        }
    } else if (hoveredDevice) {
        hoveredDevice.material.color.set(0x00ff00); // Reset hovered device color when not hovering
        hoveredDevice = null;
    }

    if (isDragging && selectedDevice && !shiftPressed) {
        const dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
        const intersectionPoint = new THREE.Vector3();

        if (raycaster.ray.intersectPlane(dragPlane, intersectionPoint)) {
            selectedDevice.position.copy(intersectionPoint);

            // Update the sprite position along with the device
            const deviceData = devices.find(d => d.device === selectedDevice);
            if (deviceData) {
                deviceData.textLabel.position.copy(intersectionPoint).add(new THREE.Vector3(0, 1, 0)); // Position above the device
            }

            updateConnectedLines(selectedDevice); // Update connected lines when moving
        }
    }
}

function handleMouseUp() {
    if (selectedDevice) {
        console.log('Mouse up, resetting selection.');
        if (!shiftPressed) {
            selectedDevice.material.color.set(0x00ff00); // Reset color
        }
        isDragging = false;
    }
}
