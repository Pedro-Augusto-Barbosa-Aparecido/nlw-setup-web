import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import dayjs from "dayjs";

interface HabitPopoverProps {
  date: Date
  onCompletedChange: (completed: number) => void
}

interface HabitsInfo {
  possibleHabits: {
    id: string;
    title: string;
    created_at: string;
  }[];
  completedHabits: string[];
}

export function HabitList({date, onCompletedChange}: HabitPopoverProps) {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>()
 
  useEffect(() => {
    api.get("day", {
      params: {
        date: date.toISOString()
      }
    }).then(response => {
      setHabitsInfo(response.data)
    })
  }, [])

  async function handleToggleHabit(habitId: string) {
    await api.patch(`habits/${habitId}/toggle`)
    const isHabitAlreadyCompleted = habitsInfo!.completedHabits.includes(habitId)

    let completedHabits: string[] = []

    if (isHabitAlreadyCompleted) {
      completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId)

      setHabitsInfo({
        possibleHabits: habitsInfo!.possibleHabits,
        completedHabits
      })
    } else {
      completedHabits = [...habitsInfo!.completedHabits, habitId];

      setHabitsInfo({
        possibleHabits: habitsInfo!.possibleHabits,
        completedHabits
      })
    }

    onCompletedChange(completedHabits.length)
  }

  const isDatePast = dayjs(date).endOf("day").isBefore(new Date())

  return (
      <div className="mt-6 flex flex-col gap-3">
        {habitsInfo?.possibleHabits.map((habits) => {
          return (
            <Checkbox.Root
              key={habits.id}
              disabled={isDatePast}
              onCheckedChange={() => handleToggleHabit(habits.id)}
              defaultChecked={habitsInfo.completedHabits.includes(habits.id)}
              className="flex items-center group focus:outline-none disabled:cursor-not-allowed"
            >
              <div
                className="h-8 w-8 focus:outline-none group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500"
              >
                <Checkbox.Indicator>
                  <Check 
                    size={20} 
                    weight="bold" 
                    className="text-white" 
                  />
                </Checkbox.Indicator>
              </div>
    
              <span
                className="font-semibold text-xl ml-3 text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400"
              >
                {habits.title}
              </span>
            </Checkbox.Root>
          )
        })}

      </div>
  )
}