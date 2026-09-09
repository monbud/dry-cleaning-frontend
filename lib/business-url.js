export const BUSINESS_ORIGIN = 'https://drycleaning.finbudtechnologies.com';
export const isBusinessId = id => typeof id === 'string' && /^[a-f\d]{24}$/i.test(id);
export function businessPath(id) {
  if (!isBusinessId(id)) throw new Error('Invalid business identifier.');
  return `/${id.toLowerCase()}`;
}
export const businessUrl = id => `${BUSINESS_ORIGIN}${businessPath(id)}`;
