/// A tool for CRUD operations on the Fauna database.
///
/// All items sent into the CRUD functions should be normalized using @features/normalize.js
/// All functions are single or bulk depending on the data type that was passed in.

/// {
///    data: { ...put database data here},
///    collection: "Collection Name"
/// }

import { Collection, Create, Lambda, Map, Select, Var } from "faunadb";
import { normalizeDbObject } from "./normalize";

export class DBContext {
  static _clientID = process.env.FAUNADB_CLIENT_SECRET;

  // Connect to redux, get the user token, setup Fauna client.
  constructor(store) {
    console.debug("Constructing DB Context.");
    this.store = store;
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
      const badData = data.maps((d) => {
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

      try {
        const res = await this.fauna.query(
          Map(
            data,
            Lambda(
              "data",
              Create(
                Collection(
                  Select("collection", Var("data"), Select("data", Var("data")))
                )
              )
            )
          )
        );
        if (res == null) {
          throw new Error(
            "Could not create object. Database returned an empty object."
          );
        }
        console.debug(res);
        return res.map((d) => normalizeDbObject(d));
      } catch (e) {
        console.error(e);
        throw e;
      }
    }

    if (data instanceof Object) {
      // Treat the data as a single object
      if (!data.collection) {
        throw new Error("Collection was not provided.");
      }
      try {
        const res = await this.fauna.query(
          Create(Collection(data.collection), data.data)
        );
        if (res == null) {
          throw new Error(
            "Could not create object. Database returned an empty object."
          );
        }
        console.debug(res);
        return normalizeDbObject(res);
      } catch (e) {
        // TODO: Remove this.
        console.error(e);
        throw e;
      }
    }

    // data is not a supported type.
    throw new Error(
      "Cannot add a non-object to the database. Please serialize it first."
    );
  }

  /// Pass in any normalized object or array of normalized objects that's already been created.
  async update(data) {
    if (data instanceof Array) {
      // Treat the data as an array
    } else {
      // Treat the data as a single object
    }
  }

  async delete(data) {
    if (data instanceof Array) {
      // Treat the data as an array
    } else {
      // Treat the data as a single object
    }
  }

  _onTokenUpdate() {}
}

export class BulkOperationError extends Error {
  constructor(message, badData) {
    super(message);
    this.message = { message, badData };
    this.name = "BulkOperationError";
  }
}

export const context = new DBContext();
