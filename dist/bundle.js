/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ConnectionManager.js":
/*!**********************************!*\
  !*** ./src/ConnectionManager.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   connectDevices: () => (/* binding */ connectDevices),\n/* harmony export */   updateConnectedLines: () => (/* binding */ updateConnectedLines)\n/* harmony export */ });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/* harmony import */ var _SceneSetup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SceneSetup.js */ \"./src/SceneSetup.js\");\n\n\nvar lineMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.LineBasicMaterial({\n  color: 0x000000\n});\nfunction connectDevices(device1, device2) {\n  if (!device1 || !device2) {\n    console.error('Invalid devices:', device1, device2);\n    return;\n  }\n  console.log('Connection made between:', device1.name, device2.name);\n  var points = [];\n  points.push(device1.position.clone());\n  points.push(device2.position.clone());\n  var lineGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.BufferGeometry().setFromPoints(points);\n  var line = new three__WEBPACK_IMPORTED_MODULE_1__.Line(lineGeometry, lineMaterial);\n  _SceneSetup_js__WEBPACK_IMPORTED_MODULE_0__.scene.add(line);\n\n  // Store reference to the line in each device\n  device1.connectedLines = device1.connectedLines || [];\n  device2.connectedLines = device2.connectedLines || [];\n  device1.connectedLines.push({\n    line: line,\n    connectedDevice: device2\n  });\n  device2.connectedLines.push({\n    line: line,\n    connectedDevice: device1\n  });\n}\nfunction updateConnectedLines(device) {\n  if (!device.connectedLines) return;\n  device.connectedLines.forEach(function (connection) {\n    var line = connection.line,\n      connectedDevice = connection.connectedDevice;\n    var positions = line.geometry.attributes.position.array;\n    positions[0] = device.position.x;\n    positions[1] = device.position.y;\n    positions[2] = device.position.z;\n    positions[3] = connectedDevice.position.x;\n    positions[4] = connectedDevice.position.y;\n    positions[5] = connectedDevice.position.z;\n    line.geometry.attributes.position.needsUpdate = true;\n  });\n}\n\n//# sourceURL=webpack://packettracerclone/./src/ConnectionManager.js?");

/***/ }),

/***/ "./src/DeviceManager.js":
/*!******************************!*\
  !*** ./src/DeviceManager.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addDevice: () => (/* binding */ addDevice),\n/* harmony export */   devices: () => (/* binding */ devices)\n/* harmony export */ });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/* harmony import */ var _SceneSetup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SceneSetup.js */ \"./src/SceneSetup.js\");\n\n\nvar deviceGeometries = {\n  host: new three__WEBPACK_IMPORTED_MODULE_1__.SphereGeometry(0.5, 32, 32),\n  // Sphere for Host\n  \"switch\": new three__WEBPACK_IMPORTED_MODULE_1__.BoxGeometry(0.5, 0.5, 0.5),\n  // Box for Switch\n  router: new three__WEBPACK_IMPORTED_MODULE_1__.CylinderGeometry(0.3, 0.3, 0.5, 32) // Cylinder for Router\n};\nvar deviceMaterials = {\n  host: new three__WEBPACK_IMPORTED_MODULE_1__.MeshBasicMaterial({\n    color: 0xff0000\n  }),\n  // Red for Host\n  \"switch\": new three__WEBPACK_IMPORTED_MODULE_1__.MeshBasicMaterial({\n    color: 0x0000ff\n  }),\n  // Blue for Switch\n  router: new three__WEBPACK_IMPORTED_MODULE_1__.MeshBasicMaterial({\n    color: 0x00ff00\n  }) // Green for Router\n};\nvar devices = [];\n\n// Function to create a text label as a sprite\nfunction createTextLabel(name) {\n  var canvas = document.createElement('canvas');\n  var context = canvas.getContext('2d');\n  context.font = '30px Arial';\n  context.fillStyle = 'black';\n  context.fillText(name, 0, 30);\n  var texture = new three__WEBPACK_IMPORTED_MODULE_1__.CanvasTexture(canvas);\n  var spriteMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.SpriteMaterial({\n    map: texture\n  });\n  var sprite = new three__WEBPACK_IMPORTED_MODULE_1__.Sprite(spriteMaterial);\n  sprite.scale.set(2, 1, 1); // Adjust the scale as needed\n  return sprite;\n}\nfunction addDevice(name, x, y) {\n  var geometry, material;\n  if (name.includes('host')) {\n    geometry = deviceGeometries.host;\n    material = deviceMaterials.host;\n  } else if (name.includes('switch')) {\n    geometry = deviceGeometries[\"switch\"];\n    material = deviceMaterials[\"switch\"];\n  } else if (name.includes('router')) {\n    geometry = deviceGeometries.router;\n    material = deviceMaterials.router;\n  } else {\n    console.warn('Unknown device type:', name);\n    return;\n  }\n  var device = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(geometry, material);\n  device.position.set(x, y, 0);\n  device.name = name;\n\n  // Create and attach the text label to the device\n  var textLabel = createTextLabel(name);\n  textLabel.position.set(x, y + 1, 0); // Position the label above the device\n  _SceneSetup_js__WEBPACK_IMPORTED_MODULE_0__.scene.add(textLabel);\n  _SceneSetup_js__WEBPACK_IMPORTED_MODULE_0__.scene.add(device);\n  devices.push(device);\n  console.log(\"\".concat(name, \" added to the scene.\"));\n}\n\n\n//# sourceURL=webpack://packettracerclone/./src/DeviceManager.js?");

/***/ }),

/***/ "./src/EventManager.js":
/*!*****************************!*\
  !*** ./src/EventManager.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   setupMouseEvents: () => (/* binding */ setupMouseEvents)\n/* harmony export */ });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/* harmony import */ var _SceneSetup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SceneSetup.js */ \"./src/SceneSetup.js\");\n/* harmony import */ var _DeviceManager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DeviceManager.js */ \"./src/DeviceManager.js\");\n/* harmony import */ var _ConnectionManager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ConnectionManager.js */ \"./src/ConnectionManager.js\");\n\n\n\n\n\nvar selectedDevice = null;\nvar isDragging = false;\nvar shiftPressed = false;\nvar hoveredDevice = null;\nfunction setupMouseEvents() {\n  var raycaster = new three__WEBPACK_IMPORTED_MODULE_3__.Raycaster();\n  var mouse = new three__WEBPACK_IMPORTED_MODULE_3__.Vector2();\n  var lineMaterial = new three__WEBPACK_IMPORTED_MODULE_3__.LineBasicMaterial({\n    color: 0xffffff\n  });\n  window.addEventListener('keydown', function (event) {\n    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {\n      console.log(\"Shift key down detected\");\n      shiftPressed = true;\n    }\n  });\n  window.addEventListener('keyup', function (event) {\n    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {\n      console.log(\"Shift key up detected\");\n      shiftPressed = false;\n      if (hoveredDevice) {\n        hoveredDevice.material.color.set(0x00ff00); // Reset hovered device color\n        hoveredDevice = null;\n      }\n    }\n  });\n  _SceneSetup_js__WEBPACK_IMPORTED_MODULE_0__.renderer.domElement.addEventListener('mousedown', function (event) {\n    handleMouseDown(event, raycaster, mouse, lineMaterial);\n  });\n  _SceneSetup_js__WEBPACK_IMPORTED_MODULE_0__.renderer.domElement.addEventListener('mousemove', function (event) {\n    handleMouseMove(event, raycaster, mouse);\n  });\n  _SceneSetup_js__WEBPACK_IMPORTED_MODULE_0__.renderer.domElement.addEventListener('mouseup', handleMouseUp);\n}\nfunction handleMouseDown(event, raycaster, mouse, lineMaterial) {\n  var rect = _SceneSetup_js__WEBPACK_IMPORTED_MODULE_0__.renderer.domElement.getBoundingClientRect();\n  mouse.x = (event.clientX - rect.left) / rect.width * 2 - 1;\n  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;\n  raycaster.setFromCamera(mouse, _SceneSetup_js__WEBPACK_IMPORTED_MODULE_0__.camera);\n  var intersects = raycaster.intersectObjects(_DeviceManager_js__WEBPACK_IMPORTED_MODULE_1__.devices);\n  if (intersects.length > 0) {\n    var intersectedDevice = intersects[0].object;\n    if (shiftPressed) {\n      if (selectedDevice === null) {\n        console.log('First device selected:', intersectedDevice.name);\n        selectedDevice = intersectedDevice;\n        selectedDevice.material.color.set(0xff0000); // Highlight selected device\n      } else if (intersectedDevice !== selectedDevice) {\n        console.log('Second device selected:', intersectedDevice.name);\n        (0,_ConnectionManager_js__WEBPACK_IMPORTED_MODULE_2__.connectDevices)(selectedDevice, intersectedDevice);\n        selectedDevice.material.color.set(0x00ff00); // Reset color of selected device\n        intersectedDevice.material.color.set(0x00ff00); // Reset color of connected device\n        selectedDevice = null; // Reset selection after connection\n      }\n    } else {\n      selectedDevice = intersectedDevice;\n      isDragging = true;\n      console.log('Device selected for dragging:', selectedDevice.name);\n      selectedDevice.material.color.set(0xff0000); // Highlight the device being dragged\n    }\n  } else {\n    console.log('No device intersected.');\n    selectedDevice = null;\n    isDragging = false;\n  }\n}\nfunction handleMouseMove(event, raycaster, mouse) {\n  var rect = _SceneSetup_js__WEBPACK_IMPORTED_MODULE_0__.renderer.domElement.getBoundingClientRect();\n  mouse.x = (event.clientX - rect.left) / rect.width * 2 - 1;\n  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;\n  raycaster.setFromCamera(mouse, _SceneSetup_js__WEBPACK_IMPORTED_MODULE_0__.camera);\n  var intersects = raycaster.intersectObjects(_DeviceManager_js__WEBPACK_IMPORTED_MODULE_1__.devices);\n  if (shiftPressed && selectedDevice && intersects.length > 0) {\n    var intersectedDevice = intersects[0].object;\n    if (intersectedDevice !== selectedDevice && intersectedDevice !== hoveredDevice) {\n      if (hoveredDevice) {\n        hoveredDevice.material.color.set(0x00ff00); // Reset previously hovered device color\n      }\n      hoveredDevice = intersectedDevice;\n      hoveredDevice.material.color.set(0xffff00); // Highlight the hovered device\n      console.log('Hovering over potential second device:', hoveredDevice.name);\n    }\n  } else if (hoveredDevice) {\n    hoveredDevice.material.color.set(0x00ff00); // Reset hovered device color when not hovering\n    hoveredDevice = null;\n  }\n  if (isDragging && selectedDevice && !shiftPressed) {\n    var dragPlane = new three__WEBPACK_IMPORTED_MODULE_3__.Plane(new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(0, 0, 1), 0);\n    var intersectionPoint = new three__WEBPACK_IMPORTED_MODULE_3__.Vector3();\n    if (raycaster.ray.intersectPlane(dragPlane, intersectionPoint)) {\n      selectedDevice.position.copy(intersectionPoint);\n      (0,_ConnectionManager_js__WEBPACK_IMPORTED_MODULE_2__.updateConnectedLines)(selectedDevice); // Update connected lines when moving\n    }\n  }\n}\nfunction handleMouseUp() {\n  if (selectedDevice) {\n    console.log('Mouse up, resetting selection.');\n    if (!shiftPressed) {\n      selectedDevice.material.color.set(0x00ff00); // Reset color\n    }\n    isDragging = false;\n  }\n}\n\n//# sourceURL=webpack://packettracerclone/./src/EventManager.js?");

/***/ }),

/***/ "./src/SceneSetup.js":
/*!***************************!*\
  !*** ./src/SceneSetup.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   camera: () => (/* binding */ camera),\n/* harmony export */   renderer: () => (/* binding */ renderer),\n/* harmony export */   scene: () => (/* binding */ scene)\n/* harmony export */ });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n// src/SceneSetup.js\n\nvar scene = new three__WEBPACK_IMPORTED_MODULE_0__.Scene();\nvar camera = new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);\nvar renderer = new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer();\nrenderer.setSize(window.innerWidth - 200, window.innerHeight);\ndocument.getElementById('canvas-container').appendChild(renderer.domElement);\ncamera.position.z = 5;\nfunction animate() {\n  requestAnimationFrame(animate);\n  renderer.render(scene, camera);\n  renderer.setClearColor(0xffffff);\n}\nanimate();\n\n\n//# sourceURL=webpack://packettracerclone/./src/SceneSetup.js?");

/***/ }),

/***/ "./src/SidebarManager.js":
/*!*******************************!*\
  !*** ./src/SidebarManager.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   setupSidebar: () => (/* binding */ setupSidebar)\n/* harmony export */ });\n/* harmony import */ var _DeviceManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DeviceManager.js */ \"./src/DeviceManager.js\");\n// SidebarManager.js\n\nfunction setupSidebar() {\n  document.querySelectorAll('.device').forEach(function (element) {\n    element.addEventListener('click', function () {\n      var name = element.id;\n      // Adding a random position with a wider range to avoid overlap\n      (0,_DeviceManager_js__WEBPACK_IMPORTED_MODULE_0__.addDevice)(name, Math.random() * 8 - 4, Math.random() * 8 - 4);\n    });\n  });\n}\n\n//# sourceURL=webpack://packettracerclone/./src/SidebarManager.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _SceneSetup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SceneSetup.js */ \"./src/SceneSetup.js\");\n/* harmony import */ var _ConnectionManager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ConnectionManager.js */ \"./src/ConnectionManager.js\");\n/* harmony import */ var _DeviceManager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DeviceManager.js */ \"./src/DeviceManager.js\");\n/* harmony import */ var _EventManager_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./EventManager.js */ \"./src/EventManager.js\");\n/* harmony import */ var _SidebarManager_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SidebarManager.js */ \"./src/SidebarManager.js\");\n\n\n\n\n\n\n\n(0,_EventManager_js__WEBPACK_IMPORTED_MODULE_3__.setupMouseEvents)();\n(0,_SidebarManager_js__WEBPACK_IMPORTED_MODULE_4__.setupSidebar)();\n\n//# sourceURL=webpack://packettracerclone/./src/index.js?");

/***/ }),

/***/ "./node_modules/three/build/three.module.js":
/*!**************************************************!*\
  !*** ./node_modules/three/build/three.module.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;