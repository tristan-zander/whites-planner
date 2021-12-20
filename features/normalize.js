import { Collection, Ref } from "faunadb";

export function normalizeDbObject(obj) {
  const { ts, ref, data, ...rest } = obj;

  if (rest.length > 0) {
    console.error("Caught unexpected values.", rest);
  }

  let normalized = {
    ...data,
    ts,
    ref: normalizeRef(ref),
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

export function faunaTimeToISO(time) {
  // TODO: what's the right value?
  return time.value.beepboop;
}

export function undoNormalizeDbObject(normalized) {
  const { ref, ts, owner, ...rest } = normalized;
  return {
    data: { ...rest, owner: owner ? undoNormalizeRef(owner) : null },
    ref: undoNormalizeRef(ref),
    ts,
  };
}

export function undoNormalizeRef(ref) {
  return Ref(Collection(ref.collection), ref.id);
}
