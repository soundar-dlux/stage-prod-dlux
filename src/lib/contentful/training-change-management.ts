import "server-only";
import { TRAINING_CHANGE_MANAGEMENT_QUERY } from "@/src/app/services/training-&-change-management/queries";
import { TrainingChangeManagementData } from "@/src/app/services/training-&-change-management/types";
import { fetchContentfulGraphQL } from "./server-client";

export async function getTrainingChangeManagement(): Promise<TrainingChangeManagementData | null> {
  return fetchContentfulGraphQL<TrainingChangeManagementData>(
    TRAINING_CHANGE_MANAGEMENT_QUERY,
    { revalidate: 60 }
  );
}
