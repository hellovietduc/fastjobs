exports.mostCommonElementsOf = (array, top = 5) => {
    array.sort();
    const elements = [];

    for (const e of new Set(array)) {
        elements.push({
            element: e,
            appearances: array.lastIndexOf(e) - array.indexOf(e)
        });
    }

    return elements
        .sort((a, b) => b.appearances - a.appearances)
        .map(e => e.element)
        .slice(0, top);
};
