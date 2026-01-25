export function FormatTimeArticle(date: Date) {
  const day = date.getDate(); 
  const month = date.getMonth() + 1; // 1–12
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

function pluralize(
  value: number,
  one: string,
  few: string,
  many: string
): string {
  if (value === 1) return one;
  if (value >= 2 && value <= 4) return few;
  return many;
}

export function FormatWhenMessage(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  console.log("diff: " + diffMs)
  console.log(now.toISOString());
  console.log(date.toISOString());

  if (diffMs < 0) return "v budoucnosti";

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours   = Math.floor(minutes / 60);
  const days    = Math.floor(hours / 24);
  const months  = Math.floor(days / 30);   // orientačně
  const years   = Math.floor(days / 365);  // orientačně

  console.log("seconds:" + seconds);
  console.log("minutes:" + minutes);
  console.log("hours:" + hours);
  console.log("days:" + days);
  console.log("months:" + months);
  console.log("years:" + years);

  if (years >= 1) {
    return `před ${years} ${pluralize(years, "rokem", "roky", "lety")}`;
  }

  if (months >= 1) {
    return `před ${months} ${pluralize(months, "měsícem", "měsíci", "měsíci")}`;
  }

  if (days >= 1) {
    return `před ${days} ${pluralize(days, "dnem", "dny", "dny")}`;
  }

  if (hours >= 1) {
    return `před ${hours} ${pluralize(hours, "hodinou", "hodinami", "hodinami")}`;
  }

  if (minutes >= 1) {
    return `před ${minutes} ${pluralize(minutes, "minutou", "minutami", "minutami")}`;
  }

  return `před ${seconds} ${pluralize(seconds, "sekundou", "sekundami", "sekundami")}`;
}
