const store =
  globalThis.__musaConsultingDevStore ||
  (globalThis.__musaConsultingDevStore = {
    users: [],
    appointments: [],
    inquiries: []
  });

export function canUseDevStore() {
  return process.env.NODE_ENV !== "production";
}

export function getDevStore() {
  return store;
}
