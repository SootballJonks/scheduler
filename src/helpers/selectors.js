export function getAppointmentsForDay(state, day) {
  let output = [];

  for (let item of state.days) {
    if (item.name === day) {
      for (let value of item.appointments) {
        output.push(state.appointments[value]);
      }
    }
  }
  return output;
}