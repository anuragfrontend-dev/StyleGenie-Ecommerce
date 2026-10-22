import dayjs from 'dayjs'

export function getDeliveryProgress(orderDate: string) {
  const orderTime = dayjs(orderDate);
  const deliveryDate = orderTime.add(3, 'day');

  const totalTime = deliveryDate.diff(orderTime, 'minutes');
  const passedTime = dayjs().diff(orderTime, 'minutes');
  const percent = Math.min(100, Math.max(5, (passedTime / totalTime) * 100));

  return {
    percent,
    deliveryDate
  }
}