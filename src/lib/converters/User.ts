import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  FirestoreDataConverter,
  collection,
  query,
  where
} from "firebase/firestore";
import { User } from "next-auth";
import { db } from "../../../firebase";

const userConverter: FirestoreDataConverter<User> = {
  toFirestore: function(customer: User): DocumentData {
    return {
      email: customer.email,
      name: customer.name,
      image: customer.image,
    }
  },

  fromFirestore: function(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): User {
    const data = snapshot.data(options);

    return {
      id: snapshot.id,
      email: data.email,
      name: data.name,
      image: data.image,
    }
  }
}

export const getUserByEmailRef = (email: string) => query(
  collection(db, "users"),
  where("email", "==", email)
).withConverter(userConverter);