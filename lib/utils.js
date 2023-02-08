import { supabase } from "@/lib/supabaseClient";

// add new Todo - can probably move to utils file eventually
export const addNewTodo = async (e) => {
  try {
    if (task && userId) {
      e.preventDefault();
      const { data, error } = await supabase.from("todos").insert({
        task,
        user_id: userId,
      });
      setTask("");
      if (error) throw error;
    }
  } catch (error) {
    console.log("error: ", error);
  }
};
