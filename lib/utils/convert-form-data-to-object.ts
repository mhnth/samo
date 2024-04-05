export function convertFormDataToObject(formData: FormData): {
  [key: string]: string | string[];
} {
  const object: { [key: string]: string | string[] } = {};
  formData.forEach((value: string | File, key: string) => {
    if (object.hasOwnProperty(key)) {
      if (!Array.isArray(object[key])) {
        object[key] = [object[key] as string];
      }
      (object[key] as string[]).push(
        value instanceof File ? value.name : value,
      );
    } else {
      object[key] = value instanceof File ? value.name : value;
    }
  });
  return object;
}
