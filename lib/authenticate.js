export async function isInstructor(user) {
  return user?.role !== "instructor";
}
