export default function camelCaseToSpaced  (camelCaseString)  {
  let result = camelCaseString.replace(/([A-Z])/g, ' $1');
  return result.trim();
};