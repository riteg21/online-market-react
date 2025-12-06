import { useOrderForm } from "../../context/FormOfOrderContext";

export const HistoryOfOrders = () => {
  const { getOrdersHistory } = useOrderForm();
  const historyOfOrders = getOrdersHistory();
  console.log(historyOfOrders);
  return <div>history of orders</div>;
};
