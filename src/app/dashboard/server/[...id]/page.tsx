"use client";

import { useParams } from "next/navigation";

const DetailServerPage = () => {
  const params = useParams();
  const { id } = params;

  return <div>DetailServerPage: {id}</div>;
};

export default DetailServerPage;
