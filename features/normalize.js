import { Collection, Ref } from "faunadb";

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

export function undoNormalizeDbObject(normalized) {
  let obj = { data: {}, ts: null, ref: {} };
  Object.entries(normalized).forEach(([key, value]) => {
    if (key == "ts") {
      obj.ts = value;
      return;
    }
    if (key == "ref") {
      // The ref will stay normalized for now.
      obj.ref = value;
      return;
    }
    if (key == "owner") {
      obj.data.owner = undoNormalizeRef(value);
      return;
    }
    obj.data[key] = value;
  });
  return obj;
}

export function undoNormalizeRef(ref) {
  let obj = Ref(Collection(ref.collection), ref.id);
  console.debug(obj, obj.toJSON());
  return obj.toJSON();
}
