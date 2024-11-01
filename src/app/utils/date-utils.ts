export function formatAge(birthDate: Date): string {
    const currentDate = new Date();
    const ageInMilliseconds = currentDate.getTime() - birthDate.getTime();
    const millisecondsInDay = 24 * 60 * 60 * 1000;
    const years = Math.floor(ageInMilliseconds / (365 * millisecondsInDay));
    const days = Math.floor((ageInMilliseconds % (365 * millisecondsInDay)) / millisecondsInDay);
    return `${years} years ${days} days`;
}