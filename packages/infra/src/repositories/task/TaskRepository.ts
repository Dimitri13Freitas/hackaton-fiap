import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { ITaskRepository } from "@repo/application";
import { Task } from "@repo/domain";
import { db } from "../../firebase/firebase-config";

export class TaskRepository implements ITaskRepository {
  async getTasks(userId: string): Promise<Task[]> {
    const snapshot = await getDocs(collection(db, "users", userId, "tasks"));

    return snapshot.docs.map(
      (doc) =>
        new Task(
          doc.id,
          doc.data().content,
          doc.data().columnId,
          doc.data().createAt,
        ),
    );
  }

  async createTask(userId: string, task: Task) {
    await addDoc(collection(db, "users", userId, "tasks"), {
      content: task.content,
      columnId: task.columnId,
      createAt: task.createAt,
    });
  }

  async updateTask(userId: string, task: Task) {
    const ref = doc(db, "users", userId, "tasks", task.id);

    await updateDoc(ref, {
      content: task.content,
      columnId: task.columnId,
    });
  }

  async deleteTask(userId: string, taskId: string) {
    const ref = doc(db, "users", userId, "tasks", taskId);
    await deleteDoc(ref);
  }
}
