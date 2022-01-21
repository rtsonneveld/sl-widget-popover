export function generateBoundingClientRect(x = 0, y = 0): () => DOMRect {
    return () => ({
      width: 0,
      height: 0,
      top: y,
      right: x,
      bottom: y,
      left: x,
      x: 0,
      y: 0,
      toJSON: () => null,
    });
  }