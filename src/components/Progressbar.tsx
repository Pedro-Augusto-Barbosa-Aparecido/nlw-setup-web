interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="h-3 rounded-xl bg-zinc-600 w-full mt-4">
      <div
        role="progressbar"
        aria-label="Progresso de hábitos completados nesse dia"
        aria-valuenow={75}
        className="h-3 rounded-xl bg-violet-600 transition-all duration-1000"
        style={{
          width: `${progress}%`
        }} 
      />
    </div>
  )
}