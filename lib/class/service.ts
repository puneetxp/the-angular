export function initservice(services: any[] = [], prefix?: string) {
  services.forEach(i => { i.prefix(prefix).all() })
}
export function initservicebyaction(services: any[], prefix?: string) {
  services.forEach(i => { i.prefix(prefix) })
}
