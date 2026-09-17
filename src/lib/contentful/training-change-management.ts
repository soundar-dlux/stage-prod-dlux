import { TRAINING_CHANGE_MANAGEMENT_QUERY } from "@/src/app/services/training-&-change-management/queries";
import { TrainingChangeManagementData } from "@/src/app/services/training-&-change-management/types";

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN!;

export async function getTrainingChangeManagement(): Promise<TrainingChangeManagementData> {
  const res = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}/environments/production`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query: TRAINING_CHANGE_MANAGEMENT_QUERY }),
      next: { revalidate: 60 },
    }
  );

  const { data, errors } = await res.json();
  if (errors) throw new Error("Contentful fetch failed");

  return data;
}
