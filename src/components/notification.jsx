import React, { useEffect } from "react";
import { useApi } from "../helpers/api";

export const Notification = () => {
  const { data, callApi } = useApi();
  useEffect(() => {
    callApi({
      url: `data/get_relevant_incidents?lat=${12.92535923549709}&lng=${77.54707900924186}&radius_km=100&user_id=alice@example.com`,
    });
  }, []);

  return <div>Notification</div>;
};
