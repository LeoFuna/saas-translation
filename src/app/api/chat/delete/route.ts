import { NextResponse } from "next/server";
import { adminDb } from "../../../../../firebase-admin";

export async function DELETE(req: Request) {
  const { chatId } = await req.json();

  const ref = adminDb.collection('chats').doc(chatId);

  const bulkWriter = adminDb.bulkWriter();
  const MAX_RETRY_ATTEMPTS = 5;

  bulkWriter.onWriteError((error) => {
    if (error.failedAttempts < MAX_RETRY_ATTEMPTS) {
      return true;
    };
    console.log('Failed write at document: ', error.documentRef.path);
    return false;
  });

  try {
    //https://stackoverflow.com/questions/66013255/how-to-recursively-delete-collection-in-firestore
    await adminDb.recursiveDelete(ref, bulkWriter);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Promise rejected: ", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}