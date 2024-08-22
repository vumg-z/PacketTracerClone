// SidebarManager.js
import { addDevice } from './DeviceManager.js';

export function setupSidebar() {
    document.querySelectorAll('.device').forEach(element => {
        element.addEventListener('click', () => {
            const name = element.id;
            // Adding a random position with a wider range to avoid overlap
            addDevice(name, Math.random() * 8 - 4, Math.random() * 8 - 4);
        });
    });
}
