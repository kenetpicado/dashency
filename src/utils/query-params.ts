export default function cleanQueryParams(params: any) {
  return Object.fromEntries(Object.entries(params).filter(([_, value]) => value))
}
