export function normalizeDbObject(obj) {
  // TODO: Verify if this is always the way the Fauna sends refs back as JSON
  let normalized = {
    ...obj.data,
    ts: obj.ts,
    ref: normalizeRef(obj.ref),
  };

  if (obj.data.owner) {
    normalized.owner = normalizeRef(obj.data.owner);
  }
  return normalized;
}

export function normalizeRef(ref) {
  const normalized = {
    id: ref.value.id,
    collection: ref.value.collection.value.id,
    nestedCollection: ref.value.collection.value?.collection.value.id,
  };
  return normalized;
}
