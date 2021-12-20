/// A tool for CRUD operations on the Fauna database.
///
/// All items sent into the CRUD functions should be normalized using @features/normalize.js
/// All functions are single or bulk depending on the data type that was passed in.

/// {
///    data: { ...put database data here},
///    collection: "Collection Name"
/// }

import {
  Collection,
  Create,
  Lambda,
  Map,
  Select,
  Update,
  Var,
  Ref,
  Client as FaunaClient,
} from "faunadb";
import { normalizeDbObject, undoNormalizeDbObject } from "./normalize";

export class DBContext {
  constructor(secret) {
    this.fauna = new FaunaClient({
      secret,
    });
  }

  setSecret(secret) {
    this.fauna = new FaunaClient({
      secret,
    });
  }

  /// Format for create operations:
  /// {
  ///    data: { ...put database data here },
  ///    collection: "Collection Name"
  /// }
  async create(data) {
    console.debug(data);
    if (data instanceof Array) {
      // Treat the data as an array
      // TODO: Change to use filter.
      const badData = data.map((d) => {
        if (!data.collection) {
          return { data: d, error: "No collection specified." };
        }
      });
      if (badData.length > 0) {
        throw new BulkOperationError(
          "Validation errors found in bulk create.",
          badData
        );
      }

      const res = await this.fauna.query(
        Map(
          data,
          Lambda(
            "data",
            Create(Collection(Select("collection", Var("data"))), {
              data: Select("data", Var("data")),
            })
          )
        )
      );
      if (!res) {
        throw new Error(
          "Could not create object. Database returned an empty object."
        );
      }
      console.debug(res);
      return res.map((d) => normalizeDbObject(d));
    }

    if (data instanceof Object) {
      // Treat the data as a single object
      if (!data.collection) {
        throw new Error("Collection was not provided.");
      }
      const res = await this.fauna.query(
        Create(Collection(data.collection), { data: data.data })
      );
      if (!res) {
        throw new Error(
          "Could not create object. Database returned an empty object."
        );
      }
      console.debug(res);
      return normalizeDbObject(res);
    }

    // data is not a supported type.
    throw new Error(
      "Cannot add a non-object to the database. Please serialize it first."
    );
  }

  // Read one or more objects from the database.
  async read(data) {
    // Unsure if I will implement this one.
    if (data instanceof Array) {
      // Treat the data as an array
    }
    if (data instanceof Object) {
      // Treat the data as a single object
    }

    // data is not a supported type.
    throw new Error(
      "Cannot read a non-object from the database. Please serialize it first."
    );
  }

  /// Pass in any normalized object or array of normalized objects that's already been created.
  async update(data) {
    if (data instanceof Array) {
      // Treat the data as an array
      const badData = data.filter((d) => {
        if (!data.ref || !data.ref.id || !data.ref.collection) {
          return true;
        }
        return false;
      });
      if (badData.length > 0) {
        throw new BulkOperationError("Data references not provided.", badData);
      }
      const unnormalizedData = data.map(undoNormalizeDbObject);
      const res = await this.fauna.query(
        Map(
          unnormalizedData,
          Lambda(
            "data",
            Update(
              Ref(
                Collection(
                  Select(["ref", "collection"], Var("data")),
                  Select(["ref", "id"], Var("data"))
                ),
                {
                  data: Select("data", Var("data")),
                }
              )
            )
          )
        )
      );
      if (!res) {
        throw new Error(
          "Could not update object(s). Database returned an empty object."
        );
      }
      return res.map(normalizeDbObject);
    }
    if (data instanceof Object) {
      // Treat the data as a single object
      const obj = undoNormalizeDbObject(data);
      const res = await this.fauna.query(
        Update(Ref(Collection(data.ref.collection), data.ref.id), {
          data: obj.data,
        })
      );
      if (!res) {
        throw new Error(
          "Could not update object. Database returned an empty object."
        );
      }
      return normalizeDbObject(res);
    }

    // data is not a supported type.
    throw new Error(
      "Cannot update a non-object to the database. Please serialize it first."
    );
  }

  async delete(data) {
    if (data instanceof Array) {
      // Treat the data as an array
    }
    if (data instanceof Object) {
      // Treat the data as a single object
    }

    // data is not a supported type.
    throw new Error(
      "Cannot delete a non-object from the database. Please serialize it first."
    );
  }
}

export class BulkOperationError extends Error {
  constructor(message, badData) {
    super(message);
    this.message = { message, badData };
    this.name = "BulkOperationError";
  }
}
