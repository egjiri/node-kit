export default function proxy(target: any, properties: Record<string, unknown>) {
  return new Proxy(target, {
    get: (obj, prop) => {
      // The default behavior to return the value
      if (prop in obj) {
        return obj[prop];
      }

      // Get custom properties
      for (const key in properties) {
        if (prop === key && properties.hasOwnProperty(key)) {
          return properties[key];
        }
      }
    },
  });
}
