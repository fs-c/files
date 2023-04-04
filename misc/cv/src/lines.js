const namespace = 'http://www.w3.org/2000/svg';

//
// --- utils ---
//

// convert relative to absolute point
const relToAbs = (center, point) => [
    center[0] + point[0], center[1] - point[1]
];

// convert absolute to relative point
const absToRel = (center, point) => [
    point[0] - center[0], center[1] - point[1]
];

// min and max inclusive
const randomInt = (min, max) => (
    Math.floor(Math.random() * (max - min + 1) + min)
);

// min inclusive, max exclusive
const randomFloat = (min, max) => (
    Math.random() * (max - min) + min
);

// add up relative points
const add = (...points) => points.reduce((acc, cur) => {
    acc[0] += cur[0];
    acc[1] += cur[1];

    return acc;
}, [0, 0]);

// scale a relative point by some factor
const scale = (point, factor) => [
    Math.floor(point[0] * factor),
    Math.floor(point[1] * factor)
];

// length of the line between two points (magnitude of vector between them)
const length = (p1, p2) => Math.sqrt(
    Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2)
);

// get the center of a DOM element
const getCenter = (element) => {
    const { height, width } = element.getBoundingClientRect();

    return [Math.floor(width / 2), Math.floor(height / 2)];
};

// wrap an array index such that going below 0 wraps around to the maximum and 
// vice versa
const wrapIndex = (i, max) => (
    (i < 0 ? max + i : i) % max
);

// get the svg path description fragment for the given bezier curve
const getBezierDescription = (cp1, cp2, end) => (
    `C ${cp1.join(' ')}, ${cp2.join(' ')}, ${end.join(' ')} `
);

// for every sequential pair of points (line) get the point in the middle of them
const getMidpoints = (points) => {
    const middles = [];

    for (let i = 0; i < points.length; i++) {
        middles.push(
            scale(add(points[i], points[wrapIndex(i + 1, points.length)]), 0.5)
        );
    }

    return middles;
};

// generate aesthetic random points (distribute a number of points evenly along
// a circle, for each choose a random point some distance away from it)
// points are relative to some center
const generateRandomPoints = (total, { radius = 100, spread = 20 } = {}) => {
    const points = [];

    const maxRadians = Math.PI * 2; // 360 degrees
    const randomOffset = randomFloat(0, maxRadians);
    const radianSteps = maxRadians / total;

    for (let i = 0; i < total; i++) {
        // -i to make it go clockwise, just for presentation
        const radians = (radianSteps * -i) + randomOffset;

        points.push([
            Math.floor((Math.cos(radians) * radius)) + randomInt(-spread, spread),
            Math.floor((Math.sin(radians) * radius)) + randomInt(-spread, spread),
        ]);
    }

    return points;
};

// 
// --- main api ---
//

const getAnchorPoints = (points, middlePoints) => {
    const anchors = [];

    for (let i = 0; i < points.length; i++) {
        // first line is p[i - 1] to p[i], second one is p[i] to p[i + 1]
        const l1 = length(points[wrapIndex(i - 1, points.length)], points[i]);
        const l2 = length(points[i], points[wrapIndex(i + 1, points.length)]);

        // ratio between the shorter and the longer line
        const factor = (l1 < l2 ? l1 / l2 : l2 / l1) / 2;

        const shorterMiddle = l1 < l2 ? (
            middlePoints[wrapIndex(i - 1, middlePoints.length)]
        ) : middlePoints[i];
        const longerMiddle = l1 > l2 ? (
            middlePoints[wrapIndex(i - 1, middlePoints.length)]
        ) : middlePoints[i];

        const vector = add(longerMiddle, scale(shorterMiddle, -1));

        anchors.push(add(scale(vector, factor), shorterMiddle));
    }

    return anchors;
};

const getControlPoints = (points, middlePoints, anchorPoints) => {
    const controls = [];

    for (let i = 0; i < points.length; i++) {
        const vector = add(points[i], scale(anchorPoints[i], -1));

        controls.push(add(middlePoints[wrapIndex(i - 1, middlePoints.length)], vector));
        controls.push(add(middlePoints[i], vector));
    }

    return controls;
};

const drawBlob = (element, points, attributes = {}) => {
    const midpoints = getMidpoints(points);
    const anchorPoints = getAnchorPoints(points, midpoints);
    const controlPoints = getControlPoints(points, midpoints, anchorPoints);

    let pathDescription = `M ${points[0][0]} ${points[0][1]} `;

    for (let i = 0; i < points.length; i++) {
        pathDescription += getBezierDescription(
            controlPoints[wrapIndex(i * 2 + 1, controlPoints.length)],
            controlPoints[wrapIndex(i * 2 + 2, controlPoints.length)],
            points[wrapIndex(i + 1, points.length)],
        );
    }

    const path = document.createElementNS(namespace, 'path');

    path.setAttribute('d', pathDescription);

    for (const attribute in attributes) {
        path.setAttribute(attribute, attributes[attribute]);
    }

    element.appendChild(path);
};

export const drawBackgroundLines = (element) => {
    const center = getCenter(element);
    const radius = center[1] / 4;
    const spread = center[1] / 9;

    const points = generateRandomPoints(6, { radius, spread });

    for (let i = 0; i < 8; i++) {
        const scaled = points.map((p) => scale(p, Math.pow(1.3, i)))
            .map((p) => relToAbs(center, p));

        drawBlob(element, scaled, {
            class: 'stroke-gray-400 fill-transparent',

        });
    }
}
