

export function yearFromate (time) {
  time = time * 1000;
  const date = new Date(time);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

