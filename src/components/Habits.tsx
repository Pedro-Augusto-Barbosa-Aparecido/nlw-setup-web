interface HabitProps {
  completed: number;
}

export function Habit({completed}: HabitProps) {
  return <p className="bg-gray-800 w-full text-white ">{completed}</p>
}